import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false })
      ],
      exports: [UserService, PassportModule],
      controllers: [UserController],
      providers: [UserService]
})
export class UserModule {}
