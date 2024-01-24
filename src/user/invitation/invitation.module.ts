import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService, TokenService]
})
export class InvitationModule {}
