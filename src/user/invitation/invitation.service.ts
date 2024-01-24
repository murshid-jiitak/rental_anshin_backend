import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InvitationService {
    constructor(private prisma: PrismaService,
      private tokenService: TokenService) {}

    // function to set password in db
  async setPassword(token: string, password: string): Promise<any> {
    try {
      if (!password || password.trim() === '') {
        throw new Error('Password is required');
      }

      const decodedToken = this.tokenService.verifyToken(token);
      const email = decodedToken.email;

      const existingCompany = await this.prisma.userCompany.findUnique({
        where: { email: email },
      });

      if (!existingCompany) {
        throw new Error('error while decode token not match email');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedCompany = await this.prisma.userCompany.update({
        where: { email:email },
        data: { password: hashedPassword, isLogged: true },
      });

      if (!updatedCompany) {
        throw new Error('Failed to update password');
      }

      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }
}
