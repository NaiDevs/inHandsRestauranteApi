import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Ping } from '../../database/dbinhandsRestaurante/ping';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthTask } from './health.task';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ping], 'dbinhands'),
    ScheduleModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [HealthService, HealthTask],
})
export class HealthModule {}
