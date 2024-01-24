import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CompModule } from './admin/company/company.module';
import { InvitationModule } from './user/invitation/invitation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PrismaModule,CompModule, InvitationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
