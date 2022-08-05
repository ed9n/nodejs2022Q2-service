import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCreateUser {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
