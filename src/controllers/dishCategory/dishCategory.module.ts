import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishCategory } from '../../database/dbinhandsRestaurante/dishCategory.entity';
import { DishCategoryController } from './dishCategory.controller';
import { DishCategoryService } from './dishCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishCategory], 'dbinhands')],
  controllers: [DishCategoryController],
  providers: [DishCategoryService],
})
export class DishCategoryModule {}
