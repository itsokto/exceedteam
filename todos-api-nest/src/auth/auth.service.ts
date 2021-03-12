import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthResponse } from "./auth.response";
import { SignUser } from "../models/SignUser";

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
  constructor(@InjectModel(User.name) private userDocument: Model<UserDocument>,
              private readonly jwtService: JwtService) {}

  async login(user: User): Promise<AuthResponse> {
    const userDoc = await this.userDocument.findOne({ name: user.name });

    if (!userDoc && user.password !== userDoc.password) {
      throw "Username or password is incorrect!";
    }

    return this.generateAuth(userDoc);
  }

  async refresh(auth: AuthResponse): Promise<AuthResponse> {
    const user = await this.jwtService.verifyAsync<User>(auth.refreshToken);
    const userDoc = await this.userDocument.findById(user.id);

    return this.generateAuth(userDoc);
  }

  async register(user: User): Promise<AuthResponse> {
    let userDoc = await this.userDocument.findOne({ name: user.name });

    if (userDoc) {
      throw `User with name ${user.name} already exist.`
    }

    userDoc = await this.userDocument.create(user);

    return this.generateAuth(userDoc);
  }

  private async generateAuth(user: User): Promise<AuthResponse> {
    const signUser: SignUser = user;
    console.log(signUser);

    const accessToken = await this.jwtService.signAsync({ signUser }, signOptions);
    const refreshToken = await this.jwtService.signAsync({ signUser }, refreshSignOptions);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }
}
