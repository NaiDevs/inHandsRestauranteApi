import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthOrgDto {
  @ApiProperty({ example: 'Restaurante XYZ' })
  authOrgName: string;

  @ApiProperty({ example: 'cliente123' })
  authOrgClient: string;

  @ApiProperty({ example: '+525512345678', required: false })
  authOrgPhone?: string;

  @ApiProperty({ example: 'contacto@restaurante.com' })
  authOrgEmail: string;

  @ApiProperty({ example: 'logo.png', required: false })
  authOrgLogo?: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
