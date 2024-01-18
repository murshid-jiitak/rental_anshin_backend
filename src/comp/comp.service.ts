import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompService {
    constructor(private prisma: PrismaService) {}

    async getAllCompanies() {
        try {
            const companies = await this.prisma.company.findMany();
            console.log(companies)
            return companies;
        } catch (error) {
            throw new Error(`Failed to retrieve companies: ${error.message}`);
        }
    }
    async createCompany(email: string,registerd: string, title: string, property: string,address : string, hash:string) {
        try {
            const newCompany = await this.prisma.company.create({
                data: {
                    email,
                    registerd,
                    title,
                    property:'',
                    address: '',
                    hash: ''
                },
            });
            console.log('Company created:', newCompany);
            return newCompany;
        } catch (error) {
            throw new Error(`Failed to create company: ${error.message}`);
        }
    }
}

