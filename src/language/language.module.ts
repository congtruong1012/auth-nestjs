import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageSchema } from './schema/language.schema';

@Module({
    imports: [
        LanguageModule,
        MongooseModule.forFeature([{ name: 'language', schema: LanguageSchema }]),
      ],
      controllers: [LanguageController],
      providers: [LanguageService],
})
export class LanguageModule {}
