import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'productsBrands', schema: 'public' })
export class ProductBrand {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'productBrandId' })
  productBrandId: number;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'productBrandName', nullable: false })
  productBrandName: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'userCreated', nullable: true })
  userCreated?: string;

  @ApiProperty()
  @Column({ type: 'timestamp', name: 'dateCraeted', nullable: true })
  dateCraeted?: Date;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'userModifier', nullable: true })
  userModifier?: string;

  @ApiProperty()
  @Column({ type: 'timestamp', name: 'dateModifier', nullable: true })
  dateModifier?: Date;
}
