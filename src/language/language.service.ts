/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyUpdate } from './dto/keyupdate.dto';
import { LanguageDTO } from './dto/language.dto';
import { Language } from './interface/language.interface';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel('language') private readonly languageModel: Model<Language>,
  ) {}

  async findByProject(idProject: string): Promise<Language[]> {
    return await this.languageModel.find({ projectId: idProject });
  }

  async postTranslate(languageDTO: LanguageDTO): Promise<any> {
    const { key, message, projectId } = languageDTO;
    const getKey = await this.languageModel.findOne({ key, projectId });
    if (getKey) {
      const { _id } = getKey;
      for (const item in message) {
        const updateLang = await this.languageModel.findByIdAndUpdate(
          { _id },
          {
            $set: { ['message.' + item]: message[item] },
          },
          { new: true },
        );
        return {
          msg: 'Cập nhật thành công',
          success: true,
          payload: updateLang,
        };
      }
    } else {
      const newLang = new this.languageModel(languageDTO);
      const createLang = await newLang.save();
      return {
        msg: 'Thêm thành công',
        success: true,
        payload: createLang,
      };
    }
  }

  async deleteByProject(projectId: string): Promise<any> {
    return await this.languageModel.deleteMany({ projectId });
  }

  async updateKey(keyUpdate: KeyUpdate, projectId: string): Promise<any> {
    const { keyOld, keyNew } = keyUpdate;
    return await this.languageModel.update(
      { projectId, key: keyOld },
      {
        $set: {
          key: keyNew,
        },
      },
    );
  }

}
