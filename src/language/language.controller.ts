import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { KeyUpdate } from './dto/keyupdate.dto';
import { LanguageDTO } from './dto/language.dto';
import { Language } from './interface/language.interface';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId')
  async findByProject(
    @Param('projectId') projectId: string,
  ): Promise<Language[]> {
    return await this.languageService.findByProject(projectId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async postTranslate(
    @Res() res: Response,
    @Body() languageDTO: LanguageDTO,
  ): Promise<any> {
    const payload = await this.languageService.postTranslate(languageDTO);
    return res.status(HttpStatus.CREATED).json(payload);
  }

  @Delete(':projectId')
  async deleteByProject(
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ): Promise<any> {
      const payload  = await this.languageService.deleteByProject(projectId)
    return res.status(HttpStatus.OK).json({
        payload
    });
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateKey(
    @Res() res: Response, @Body() keyUpdate: KeyUpdate, projectId: string): Promise<any>{
        const payload = await this.languageService.updateKey(keyUpdate, projectId);
        return res.status(HttpStatus.OK).json({
            payload
        })
  }
}
