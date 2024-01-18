import { Module } from '@nestjs/common';
import { CompController } from './comp.controller';
import { CompService } from './comp.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
JwtModule

@Module({
  imports:[PrismaModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions:{expiresIn: '1h'}
    }),
  ],
  controllers: [CompController],
  providers: [CompService]
})
export class CompModule {}
