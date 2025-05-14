// signup.dto.ts
import { IsEmail, MinLength, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  role: string;
}
