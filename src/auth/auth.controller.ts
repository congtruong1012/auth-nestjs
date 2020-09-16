import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }
}
