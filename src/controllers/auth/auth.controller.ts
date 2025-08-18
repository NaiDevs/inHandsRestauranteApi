import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthOrganization } from '../../database/dbinhandsRestaurante/authOrganization.entity';
import { CreateAuthOrgDto } from './dto/create-auth-org.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de organización' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', type: AuthOrganization })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('organization')
  @ApiOperation({ summary: 'Agregar nueva organización' })
  @ApiBody({ type: CreateAuthOrgDto })
  @ApiResponse({ status: 201, description: 'Organización creada', type: AuthOrganization })
  async createOrganization(@Body() body: CreateAuthOrgDto) {
    return this.authService.createOrganization(body);
  }
}
