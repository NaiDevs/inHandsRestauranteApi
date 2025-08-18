import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../../database/dbinhandsRestaurante/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory, 'dbinhands')
    private readonly repo: Repository<ProductCategory>,
  ) {}

  async findAllPaged(page: number = 1, limit: number = 10) {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
      order: { productCategoryId: 'ASC' },
    });
  }

  async findAll() {
    return this.repo.find({ where: { deleted: false }, order: { productCategoryId: 'ASC' } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { productCategoryId: id, deleted: false } });
  }

  async create(data: Partial<ProductCategory>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<ProductCategory>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }
}
