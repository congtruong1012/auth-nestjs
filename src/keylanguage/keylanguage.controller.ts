import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { KeyLanguageDTO } from './dto/keylanguage.dto';
import { KeyLanguage } from './interface/keylanguage.interface';
import { KeylanguageService } from './keylanguage.service';

@Controller('keylanguage')
export class KeylanguageController {
  constructor(private readonly keyLangService: KeylanguageService) {}

  
  @UseGuards(AuthGuard())
  @Get()
  async findAll(): Promise<KeyLanguage[]> {
    return await this.keyLangService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<KeyLanguage> {
    return await this.keyLangService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Res() res: Response,
    @Body() KeyLangDTO: KeyLanguageDTO,
  ): Promise<any> {
    const payload = await this.keyLangService.create(KeyLangDTO);
    return res.status(HttpStatus.CREATED).json({ ...payload });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Res() res: Response,
    @Body() KeyLangDTO: KeyLanguageDTO,
    @Param('id') id: string,
  ): Promise<any> {
    const payload = await this.keyLangService.update(KeyLangDTO, id);
    return res.status(HttpStatus.OK).json({ ...payload });
  }

  @Delete(':id')
  async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const payload = await this.keyLangService.delete(id);
    return res.status(HttpStatus.OK).json({ ...payload });
  }
}
