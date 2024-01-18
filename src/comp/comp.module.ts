import { Module } from '@nestjs/common';
import { CompController } from './comp.controller';
import { CompService } from './comp.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CompController],
  providers: [CompService]
})
export class CompModule {}
