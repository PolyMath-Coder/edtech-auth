import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString,  Matches, MinLength } from "class-validator";


export class RegisterDto {
    @IsString()
    @IsEmail({}, { message: 'valid email is required.'})
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email: string

   
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character',
      })
    password: string
}
