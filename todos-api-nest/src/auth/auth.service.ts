import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthResponse } from "./auth.response";
import { LoginUser } from "./models/login.user";
import { JwtUser } from "./models/jwt.user";
import { InjectMapper } from "@automapper/nestjs";
import type { Mapper } from '@automapper/types';

const config = require('../configs/jwt.config');

const signOptions: JwtSignOptions = {
  expiresIn: config.expiresIn,
  secret: config.secret
};

const refreshSignOptions: JwtSignOptions = {
  expiresIn: config.refreshExpiresIn,
  secret: config.secret
};

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userDocument: Model<UserDocument, User>,
              private readonly jwtService: JwtService,
              @InjectMapper() private mapper: Mapper) {}

  async login(user: LoginUser): Promise<AuthResponse> {
    const userDoc = await this.userDocument.findOne({ name: user.name }).exec();

    if (user.password !== userDoc?.password) {
      throw new HttpException("Username or password is incorrect", HttpStatus.BAD_REQUEST);
    }

    return this.generateAuth(userDoc);
  }

  async refresh(auth: AuthResponse): Promise<AuthResponse> {
    let user: JwtUser;
    try {
      user = await this.jwtService.verifyAsync<JwtUser>(auth.refreshToken);
    } catch {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    const userDoc = await this.userDocument.findById(user.id).exec();
    return this.generateAuth(userDoc);
  }

  async register(user: LoginUser): Promise<AuthResponse> {
    let userDoc = await this.userDocument.findOne({ name: user.name }).exec();

    if (userDoc) {
      throw new HttpException("User already exist", HttpStatus.BAD_REQUEST);
    }

    userDoc = await this.userDocument.create(user);

    return this.generateAuth(userDoc);
  }

  private async generateAuth(userDoc: UserDocument): Promise<AuthResponse> {
    const user = userDoc.toJSON<User>({ virtuals: true });
    const sign = this.mapper.map(user, JwtUser, User);

    const accessToken = await this.jwtService.signAsync({ ...sign }, signOptions);
    const refreshToken = await this.jwtService.signAsync({ ...sign }, refreshSignOptions);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }
}
