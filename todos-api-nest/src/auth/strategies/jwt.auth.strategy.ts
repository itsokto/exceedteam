import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SignUser } from "../../models/SignUser";

const config = require('../../configs/jwt.config');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    })
  }

  async validate(payload: any): Promise<SignUser> {
    console.log(payload);

    return payload;
  }
}