import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService,
    private tokenService: TokenService) {}

  async getAllCompanies() {
    try {
      const companies = await this.prisma.userCompany.findMany({
        select: {
          email:true,
          mobNumber:true,
          companyName:true,
          registeredOn:true,
          isLogged:true
        },
      });
      return companies;
    } catch (error) {
      throw new Error(`Failed to retrieve companies: ${error.message}`);
    }
  }
  async create(email: string, companyName: string, mobNumber: string) {
    try {
      
      const isMailExist = await this.prisma.userCompany.findUnique({
        where:{
          email
        }
      })
      if(isMailExist){
        return {message:"Email already exist"}
      }
      const createdCompany = await this.prisma.userCompany.create({
        data: {
          companyName: companyName,
          email: email,
          mobNumber:mobNumber,
          isLogged: false,
          password: ''
        },
      });
      // invitation token generation
      const token = this.tokenService.generateToken(email);
      
      const invitationLink = `https://yourwebsite.com/invite?token=${token}`;

      // Send invitation mail
      await this.sendInvitationEmail(email, invitationLink);

      return { success: true, message: 'invitation sent!',invitationLink};
    } catch (error) {
      throw new Error(`Failed to create company: ${error.message}`);
    }
  }
  async sendInvitationEmail(
    email: string,
    invitationLink: string,
  ): Promise<void> {
    console.log('email sent');
  }

  
}
