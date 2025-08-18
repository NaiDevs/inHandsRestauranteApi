import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBrand } from '../../database/dbinhandsRestaurante/productBrand.entity';

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectRepository(ProductBrand, 'dbinhands')
    private readonly repo: Repository<ProductBrand>,
  ) {}

  async findAllPaged(page: number = 1, limit: number = 10) {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
      order: { productBrandId: 'ASC' },
    });
  }

  async findAll() {
    return this.repo.find({ where: { deleted: false }, order: { productBrandId: 'ASC' } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { productBrandId: id, deleted: false } });
  }

  async create(data: Partial<ProductBrand>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<ProductBrand>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }
}
