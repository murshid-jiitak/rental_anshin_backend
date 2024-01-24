import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('login')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    const token = await this.userService.signin(email, password);
    return { token };
  }
}
