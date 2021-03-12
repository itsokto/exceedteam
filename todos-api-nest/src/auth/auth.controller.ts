import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { User } from "../schemas/user.schema";
import { AuthResponse } from "./auth.response";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: User): Promise<AuthResponse> {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: User): Promise<AuthResponse> {
    return this.authService.register(user);
  }

  @Post('refresh')
  refresh(@Body() auth: AuthResponse): Promise<AuthResponse> {
    return this.authService.refresh(auth);
  }
}
