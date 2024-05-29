import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { AuthRoute } from 'src/shared/constants';
import { LocalAuthGuard } from './local-auth.guard';

@Controller(AuthRoute.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoute.REGISTER)
  async registerUser (@Body() createUserDto: RegisterDto) {
    return await this.authService.create(createUserDto);
  }

  @Post(AuthRoute.LOGIN)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
   return await this.authService.login(req.user);
  }
  
}
