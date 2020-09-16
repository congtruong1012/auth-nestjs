import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { KeylanguageController } from './keylanguage.controller';
import { KeylanguageService } from './keylanguage.service';
import { KeyLanguageSchema } from './schema/keylanguage.schema';

@Module({
  imports: [
    KeylanguageModule,
    MongooseModule.forFeature([{ name: 'keylanguage', schema: KeyLanguageSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [KeylanguageController],
  providers: [KeylanguageService],
})
export class KeylanguageModule {}
