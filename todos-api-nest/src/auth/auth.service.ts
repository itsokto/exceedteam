import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "./auth.response";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userDocument: Model<UserDocument>, private readonly jwtService: JwtService) {}

  async login(user: User): Promise<AuthResponse> {
    const userDoc = await this.userDocument.findOne({ name: user.name });

    if (!userDoc && user.password !== userDoc.password) {
      throw "Username or password is incorrect!";
    }

    const accessToken = await this.jwtService.signAsync(userDoc);
    const refreshToken = await this.jwtService.signAsync(userDoc);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async refresh(auth: AuthResponse): Promise<AuthResponse> {
    const user = await this.jwtService.verifyAsync<User>(auth.refreshToken);
    const userDoc = await this.userDocument.findById(user._id);

    const accessToken = await this.jwtService.signAsync(userDoc);
    const refreshToken = await this.jwtService.signAsync(userDoc);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async register(user: User): Promise<AuthResponse> {
    let userDoc = await this.userDocument.findOne({ name: user.name });

    if (userDoc) {
      throw `User with name ${user.name} already exist.`
    }

    userDoc = await this.userDocument.create(user);

    const accessToken = await this.jwtService.signAsync(userDoc);
    const refreshToken = await this.jwtService.signAsync(userDoc);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }
}
