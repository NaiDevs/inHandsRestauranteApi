import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishCategory } from '../../database/dbinhandsRestaurante/dishCategory.entity';

@Injectable()
export class DishCategoryService {
  constructor(
    @InjectRepository(DishCategory, 'dbinhands')
    private readonly repo: Repository<DishCategory>,
  ) {}

  async findAllPaged(page: number = 1, limit: number = 10) {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
      order: { dishCategoryId: 'ASC' },
    });
  }

  async findAll() {
    return this.repo.find({ where: { deleted: false }, order: { dishCategoryId: 'ASC' } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { dishCategoryId: id, deleted: false } });
  }

  async create(data: Partial<DishCategory>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<DishCategory>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }
}
