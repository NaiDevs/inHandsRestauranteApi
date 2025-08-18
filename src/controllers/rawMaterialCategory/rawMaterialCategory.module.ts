import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialCategory } from '../../database/dbinhandsRestaurante/rawMaterialCategory.entity';
import { RawMaterialCategoryController } from './rawMaterialCategory.controller';
import { RawMaterialCategoryService } from './rawMaterialCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterialCategory], 'dbinhands')],
  controllers: [RawMaterialCategoryController],
  providers: [RawMaterialCategoryService],
})
export class RawMaterialCategoryModule {}
