import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompService {
  constructor(private prisma: PrismaService) {}

  async getAllCompanies() {
    try {
      const companies = await this.prisma.company.findMany();
      console.log(companies);
      return companies;
    } catch (error) {
      throw new Error(`Failed to retrieve companies: ${error.message}`);
    }
  }
  async create(email: string, title: string, number: number) {
    try {
      const createdCompany = await this.prisma.company.create({
        data: {
          title,
          email,
          number,
          hash: '',
          status: false,
        },
      });
      const companyId = createdCompany.id;
      const invitationLink = `https://rental-app.com/invitation?id=${companyId}`;

      // Send invitation mail
      await this.sendInvitationEmail(email, invitationLink);
      console.log(invitationLink);

      return { success: true, message: 'Company created, invitation sent!' };
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

  // function to update password in db
  async updatePassword(companyId: string, password: string): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingCompany = await this.prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!existingCompany) {
        throw new Error('Company not found');
      }

      const updatedCompany = await this.prisma.company.update({
        where: { id: companyId },
        data: { hash: hashedPassword, status: true },
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
