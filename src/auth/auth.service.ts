import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) : Promise<any> {
    // This will be used for the initial login
    const userToAttempt = await this.userService.findOneByEmail(
      loginAttempt.email,
    );
    if(userToAttempt){
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(userToAttempt.password, salt);
      if(passwordHash){
        return this.createJwtPayload(userToAttempt)
      }
    }
  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.userService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    const data : JwtPayload = {
      _id: user._id,
      email: user.email,
      fullname: user.firstname + ' ' + user.lastname
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
