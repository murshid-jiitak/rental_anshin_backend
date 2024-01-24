import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/admin/jwt.guard';

@Controller('/api/admin')
export class CompController {
  constructor(private compService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  async getAllCompanies() {
    try {
      console.log('success');
      const companies = await this.compService.getAllCompanies();
      return { success: true, data: companies };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('companies')
  async create(
    @Body('email') email: string,
    @Body('companyName') companyName: string,
    @Body('phoneNumber') mobNumber: string,
  ) {
    // if datas are succesfully inserted , send an email to componey inbox by passing id
    return await this.compService.create(email, companyName, mobNumber);
  }

  // extract id from invitaion link
  // get typed passwrod
  // pass word along with id and call updatePassword function
  
}
