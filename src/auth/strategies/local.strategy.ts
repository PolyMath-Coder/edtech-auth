import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthService } from "../auth.service";
import { ErrorResponse } from "src/shared/responses/error";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string) {
       const user = await this.authService.validateUser(email, password)
       if(!user) {
        throw new UnauthorizedException( ErrorResponse(404, 'unregistered email or incorrect password inputted', null, null))
       }
       return user
    }
}

