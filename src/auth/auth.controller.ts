import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    const token = await this.authService.signin(email, password);
    return { token };
  }
}
