import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}
  async create({ email, password }: RegisterDto) {

    const user = await this.userRepo.create({email, password});
    const saved_user = await this.userRepo.save(user)
      console.log(saved_user)
    // return 'This action adds a new auth';
  }

  login() {
    return `This action returns all auth`;
  }

 
}
