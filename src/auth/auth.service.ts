import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
    ) {}
  
    async signin(email: string, password: string) {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
    //   const passwordMatch = await bcrypt.compare(
    //     password,
    //     user.hash,
    //   );
  
      if (password != user.hash) {
        throw new UnauthorizedException('Incorrect password');
      }
  
      return this.generateToken(user.email);
    }
  
    private generateToken(userId: string) {
      const payload = { sub: userId };
      return this.jwtService.sign(payload);
    }
  }