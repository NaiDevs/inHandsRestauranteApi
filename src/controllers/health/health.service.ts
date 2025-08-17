import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ping } from '../../database/dbinhandsRestaurante/ping';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Ping, 'dbinhands')
    private readonly pingRepository: Repository<Ping>,
  ) {}

  async ping(): Promise<Ping> {
    const ping = this.pingRepository.create();
    return await this.pingRepository.save(ping);
  }
}
