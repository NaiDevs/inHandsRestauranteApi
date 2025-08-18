import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../../database/dbinhandsRestaurante/productCategory.entity';
import { ProductCategoryController } from './productCategory.controller';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory], 'dbinhands')],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
