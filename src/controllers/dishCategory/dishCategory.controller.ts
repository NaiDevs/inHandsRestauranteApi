import { Controller, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { DishCategoryService } from './dishCategory.service';
import { DishCategory } from '../../database/dbinhandsRestaurante/dishCategory.entity';

@ApiTags('dish-categories')
@Controller('dish-categories')
export class DishCategoryController {
  constructor(private readonly service: DishCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener categorías de platos paginadas' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [DishCategory] })
  async getPaged(@Query('page') page = 1, @Query('limit') limit = 10) {
    const [data, total] = await this.service.findAllPaged(Number(page), Number(limit));
    return { data, total };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todas las categorías de platos (sin paginar)' })
  @ApiResponse({ status: 200, type: [DishCategory] })
  async getSummary() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría de plato por ID' })
  @ApiResponse({ status: 200, type: DishCategory })
  async getById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva categoría de plato' })
  @ApiBody({ type: DishCategory })
  @ApiResponse({ status: 201, type: DishCategory })
  async create(@Body() body: Partial<DishCategory>) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría de plato' })
  @ApiBody({ type: DishCategory })
  @ApiResponse({ status: 200, type: DishCategory })
  async update(@Param('id') id: number, @Body() body: Partial<DishCategory>) {
    return this.service.update(id, body);
  }
}
