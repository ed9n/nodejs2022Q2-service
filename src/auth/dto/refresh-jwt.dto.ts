import { IsNotEmpty } from 'class-validator';

export class RefreshJwt {
  @IsNotEmpty()
  refreshToken: string;
}
