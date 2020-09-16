import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constant/auth.constant';
import { JwtPayload } from '../interface/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const {email, ...rest} = payload;
    const user = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
