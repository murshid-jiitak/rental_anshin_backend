import { Controller, Post, Body, Query } from '@nestjs/common';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
    constructor(private invitationService: InvitationService) {}


    @Post('register')
  async setPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.invitationService.setPassword(token, password);
      return { success: true, message: result.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
