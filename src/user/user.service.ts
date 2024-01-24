import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async signin(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        await this.validateUser(user, password);
        return this.generateToken(user.email);
      }
    
      async findUserByEmail(email: string) {
        const user = await this.prisma.userCompany.findUnique({ where: { email } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
    
      async validateUser(user: any, password: string) {
        // Use bcrypt for secure password comparison
        const passwordMatch = await bcrypt.compare(password, user.password);

        console.log(passwordMatch)
    
        if (!passwordMatch) {
          throw new UnauthorizedException('Incorrect password');
        }
        return passwordMatch;
    
      }
    
      generateToken(userId: string) {
        const payload = { sub: userId };
        return this.jwtService.sign(payload);
      }
}
