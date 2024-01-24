import { Module } from '@nestjs/common';
import { CompController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
JwtModule

@Module({
  imports:[PrismaModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions:{expiresIn: '1h'}
    }),
  ],
  controllers: [CompController],
  providers: [CompanyService, TokenService]
})
export class CompModule {}
