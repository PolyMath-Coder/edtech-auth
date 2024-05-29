import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorResponse } from 'src/shared/responses/error';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/shared/responses/success';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
  async create({ email, password }: RegisterDto) { 

    const user = await this.userRepo.findOneBy({ email })
    if(user) {
      return ErrorResponse(400, 'user with email already exists', null, null)
    }
   
    const userPayload = {
      email,
      password: await bcrypt.hash(password, 10)
    }
  
    const userEnt = await this.userRepo.create(userPayload);
    const saved_user = await this.userRepo.save(userEnt)
      const user_data = {
        id: saved_user.id,
        email: saved_user.email,
        createdAt: saved_user.createdAt
      }
      const token = this.jwtService.sign(JSON.parse(JSON.stringify(user_data)))

      return SuccessResponse(201, 'user creation successful...', { ...user_data, token: token }, null)

  }

  async validateUser (email: string, password: string) {

    const user = await this.userRepo.findOneBy({ email: email })
    if(!user) {
      return null
    }
   const compare_password = await bcrypt.compare(password, user.password)
   if(!compare_password) {
    throw new UnauthorizedException(ErrorResponse(400, 'password inputted not correct', null, null))
   }
   return user
 }

  login(user: LoginDto) {
    const user_data =  {
      id: user.id,
      email: user.email,
      
    }
    const token = this.jwtService.sign(JSON.parse(JSON.stringify(user_data)))

    return SuccessResponse(200, 'Login successful...', { ...user_data, token: token }, null)
  }

 
}
