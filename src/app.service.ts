import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    console.log(process.env.DB_HOST ,parseInt(process.env.DATABASE_PORT, 10),process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME)
    return {status: true, message: 'welcome to the future of ed-tech'};
  }
}
