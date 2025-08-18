import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterialCategory } from '../../database/dbinhandsRestaurante/rawMaterialCategory.entity';

@Injectable()
export class RawMaterialCategoryService {
  constructor(
    @InjectRepository(RawMaterialCategory, 'dbinhands')
    private readonly repo: Repository<RawMaterialCategory>,
  ) {}

  async findAllPaged(page: number = 1, limit: number = 10) {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { deleted: false },
      order: { rawMaterialCategoryId: 'ASC' },
    });
  }

  async findAll() {
    return this.repo.find({ where: { deleted: false }, order: { rawMaterialCategoryId: 'ASC' } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { rawMaterialCategoryId: id, deleted: false } });
  }

  async create(data: Partial<RawMaterialCategory>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<RawMaterialCategory>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }
}
