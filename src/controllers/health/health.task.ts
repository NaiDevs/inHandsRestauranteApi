import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ping } from '../../database/dbinhandsRestaurante/ping';

@Injectable()
export class HealthTask {
  constructor(
    @InjectRepository(Ping, 'dbinhands')
    private readonly pingRepository: Repository<Ping>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async createPing(): Promise<void> {
    console.log('Ejecutando tarea de ping: creando registro en la tabla ping');
    await this.pingRepository.save(this.pingRepository.create());
  }
}
