import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CompModule } from './comp/comp.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PrismaModule,CompModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
