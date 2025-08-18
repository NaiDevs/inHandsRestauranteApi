import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthOrganization } from '../../database/dbinhandsRestaurante/authOrganization.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthOrganization], 'dbinhands')],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
