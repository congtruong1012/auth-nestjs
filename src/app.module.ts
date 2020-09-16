import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KeylanguageModule } from './keylanguage/keylanguage.module';
import { LanguageModule } from './language/language.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppModule,
    ProjectModule,
    MongooseModule.forRoot('mongodb://localhost:27017/translator'),
    AuthModule,
    KeylanguageModule,
    LanguageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
