import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyLanguageDTO } from './dto/keylanguage.dto';
import { KeyLanguage } from './interface/keylanguage.interface';

@Injectable()
export class KeylanguageService {
  constructor(
    @InjectModel('keylanguage')
    private readonly keyLanguageModel: Model<KeyLanguage>,
  ) {}

  async findAll(): Promise<KeyLanguage[]> {
    return await this.keyLanguageModel.find({});
  }

  async findById(id: string): Promise<KeyLanguage> {
    return await this.keyLanguageModel.findOne({ _id: id });
  }

  async findByKey(key: string): Promise<KeyLanguage> {
    return await this.keyLanguageModel.findOne({ key: key });
  }

  async create(keyLanguageDTO: KeyLanguageDTO): Promise<any> {
    const { key } = keyLanguageDTO;
    const isEmpty = await this.findByKey(key);
    if (isEmpty) {
      return { success: false, msg: 'Ngôn ngữ này đã tồn tại' };
    } else {
      const newKeyLang = new this.keyLanguageModel(keyLanguageDTO);
      const payload = await newKeyLang.save();
      return { success: true, msg: 'Thêm thành công', payload };
    }
  }

  async update(keyLanguageDTO: KeyLanguageDTO, id: string): Promise<any> {
      const {key} = keyLanguageDTO;
    const isEmpty = await this.findByKey(key);
    if (isEmpty) {
      return { success: false, msg: 'Ngôn ngữ này đã tồn tại' };
    } else {
      const payload = await this.keyLanguageModel.findByIdAndUpdate(
        { _id: id },
        keyLanguageDTO,
        { new: true },
      );
      return { success: true, msg: 'Cập nhật thành công', payload };
    }
  }

  async delete(id: string): Promise<any> {
    const payload = await this.keyLanguageModel.findByIdAndDelete({ _id: id });
    return { success: true, msg: 'Xóa thành công', payload };
  }
}
