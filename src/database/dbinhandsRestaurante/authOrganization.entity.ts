import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'auth_organizations', schema: 'public' })
export class AuthOrganization {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'authOrgId', type: 'smallint' })
  authOrgId: number;

  @ApiProperty({ example: 'Restaurante XYZ' })
  @Column({ name: 'authOrgName', type: 'varchar', nullable: false })
  authOrgName: string;

  @ApiProperty({ example: 'cliente123' })
  @Column({ name: 'authOrgClient', type: 'varchar', nullable: false })
  authOrgClient: string;

  @ApiProperty({ example: '+525512345678', required: false })
  @Column({ name: 'authOrgPhone', type: 'varchar', nullable: true })
  authOrgPhone?: string;

  @ApiProperty({ example: 'contacto@restaurante.com' })
  @Column({ name: 'authOrgEmail', type: 'varchar', nullable: false })
  authOrgEmail: string;

  @ApiProperty({ example: 'logo.png', required: false })
  @Column({ name: 'authOrgLogo', type: 'varchar', nullable: true })
  authOrgLogo?: string;

  @ApiProperty({ example: 'password123' })
  @Column({ type: 'text', nullable: false })
  password: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  logging: boolean;

  @ApiProperty({ example: '2025-08-16T12:00:00Z', required: false })
  @Column({ name: 'lastLogging', type: 'timestamp', nullable: true })
  lastLogging?: Date;
}
