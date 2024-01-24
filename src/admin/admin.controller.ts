import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './admin.service';

@Controller('/api/admin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    const token = await this.authService.signin(email, password);
    return { token };
  }


}
