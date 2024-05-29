import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { AuthRoute } from 'src/shared/constants';

@Controller(AuthRoute.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoute.REGISTER)
  registerUser (@Body() createUserDto: RegisterDto) {
    return this.authService.create(createUserDto);
  }

  @Post(AuthRoute.LOGIN)
  login() {
    return this.authService.login();
  }

  
}
