import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'contacto@restaurante.com' })
  authOrgEmail: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
