import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthOrganization } from '../../database/dbinhandsRestaurante/authOrganization.entity';
import { CreateAuthOrgDto } from './dto/create-auth-org.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthOrganization, 'dbinhands')
    private readonly authOrgRepo: Repository<AuthOrganization>,
  ) {}

  async login(body: LoginDto): Promise<AuthOrganization | null> {
    const org = await this.authOrgRepo.findOne({
      where: {
        authOrgEmail: body.authOrgEmail,
        active: true,
        deleted: false,
      },
    });
    if (!org) return null;
    const isMatch = await bcrypt.compare(body.password, org.password);
    return isMatch ? org : null;
  }

  async createOrganization(body: CreateAuthOrgDto): Promise<AuthOrganization> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const org = this.authOrgRepo.create({ ...body, password: hashedPassword });
    return await this.authOrgRepo.save(org);
  }
}
