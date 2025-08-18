import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from '../../database/dbinhandsRestaurante/productBrand.entity';
import { ProductBrandController } from './productBrand.controller';
import { ProductBrandService } from './productBrand.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBrand], 'dbinhands')],
  controllers: [ProductBrandController],
  providers: [ProductBrandService],
})
export class ProductBrandModule {}
