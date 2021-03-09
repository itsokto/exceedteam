import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { User } from "../schemas/user.schema";
import { AuthResponse } from "./auth.response";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() user: User): Promise<AuthResponse> {
    return this.authService.login(user);
  }

  @Post()
  register(@Body() user: User): Promise<AuthResponse> {
    return this.authService.register(user);
  }

  @Post()
  refresh(@Body() auth: AuthResponse): Promise<AuthResponse> {
    return this.authService.refresh(auth);
  }
}
