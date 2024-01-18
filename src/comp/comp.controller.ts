import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompService } from './comp.service';


@Controller('comp')
export class CompController {
    constructor(private compService: CompService) {}

    @Get('getall')
    async getAllCompanies() {
        try {
            console.log('sucess')
            const companies = await this.compService.getAllCompanies();
            return { success: true, data: companies };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Post ('create')
    async createComponies(
        @Body('email') email: string,
        @Body('company_name') title : string,

      ) {
        createCompany(
            email,
            registerd,
            title,
            property,
            address,
            hash
        )
      }
}
