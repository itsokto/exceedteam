import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.response";
import { LoginUser } from "./models/login.user";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: "Username or password is incorrect" })
  login(@Body() user: LoginUser): Promise<AuthResponse> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: "User already exist" })
  register(@Body() user: LoginUser): Promise<AuthResponse> {
    return this.authService.register(user);
  }

  @Post('refresh')
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: "Invalid token" })
  refresh(@Body() auth: AuthResponse): Promise<AuthResponse> {
    return this.authService.refresh(auth);
  }
}
