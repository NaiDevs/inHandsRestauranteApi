import { Controller, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RawMaterialCategoryService } from './rawMaterialCategory.service';
import { RawMaterialCategory } from '../../database/dbinhandsRestaurante/rawMaterialCategory.entity';

@ApiTags('raw-material-categories')
@Controller('raw-material-categories')
export class RawMaterialCategoryController {
  constructor(private readonly service: RawMaterialCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener categorías de materia prima paginadas' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [RawMaterialCategory] })
  async getPaged(@Query('page') page = 1, @Query('limit') limit = 10) {
    const [data, total] = await this.service.findAllPaged(Number(page), Number(limit));
    return { data, total };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todas las categorías de materia prima (sin paginar)' })
  @ApiResponse({ status: 200, type: [RawMaterialCategory] })
  async getSummary() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría de materia prima por ID' })
  @ApiResponse({ status: 200, type: RawMaterialCategory })
  async getById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva categoría de materia prima' })
  @ApiBody({ type: RawMaterialCategory })
  @ApiResponse({ status: 201, type: RawMaterialCategory })
  async create(@Body() body: Partial<RawMaterialCategory>) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría de materia prima' })
  @ApiBody({ type: RawMaterialCategory })
  @ApiResponse({ status: 200, type: RawMaterialCategory })
  async update(@Param('id') id: number, @Body() body: Partial<RawMaterialCategory>) {
    return this.service.update(id, body);
  }
}
