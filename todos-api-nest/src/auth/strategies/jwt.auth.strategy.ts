import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtUser } from "../models/jwt.user";

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

  async validate(payload: any): Promise<JwtUser> {
    return payload;
  }
}