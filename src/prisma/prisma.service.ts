import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor (){
        super ({
            datasources:{
                db: {
                    url:'postgresql://postgres:postgres@localhost:5432/new_user'
                }
            }
        })
    }
}
