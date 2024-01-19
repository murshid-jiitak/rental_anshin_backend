import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CompService } from './comp.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comp')
export class CompController {
  constructor(private compService: CompService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getall')
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
  @Post('create')
  async create(
    @Body('email') email: string,
    @Body('companyName') comp_name: string,
    @Body('number') mobNumber: string,
  ) {
    // if datas are succesfully inserted , send an email to componey inbox by passing id
    return await this.compService.create(email, comp_name, mobNumber);
  }

  // extract id from invitaion link
  // get typed passwrod
  // pass word along with id and call updatePassword function
  @Post('setPass')
  async updatePassword(
    @Body('companyId') companyId: string,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.compService.updatePassword(companyId, password);
      return { success: true, message: result.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
