import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { UserDTO } from './dto/user.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(userDTO: UserDTO) : Promise<User> {

        const createdUser = new this.userModel(userDTO);
        return await createdUser.save();
    
      }
    
      async findOneByEmail(email): Promise<User> {
    
        return await this.userModel.findOne({email: email});
    
      }
}
