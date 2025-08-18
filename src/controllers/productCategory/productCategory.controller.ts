import { Controller, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '../../database/dbinhandsRestaurante/productCategory.entity';

@Controller('productCategories')
export class ProductCategoryController {
  constructor(private readonly service: ProductCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener categorías paginadas' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [ProductCategory] })
  async getPaged(@Query('page') page = 1, @Query('limit') limit = 10) {
    const [data, total] = await this.service.findAllPaged(Number(page), Number(limit));
    return { data, total };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todas las categorías (sin paginar)' })
  @ApiResponse({ status: 200, type: [ProductCategory] })
  async getSummary() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por ID' })
  @ApiResponse({ status: 200, type: ProductCategory })
  async getById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva categoría' })
  @ApiBody({ type: ProductCategory })
  @ApiResponse({ status: 201, type: ProductCategory })
  async create(@Body() body: Partial<ProductCategory>) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría' })
  @ApiBody({ type: ProductCategory })
  @ApiResponse({ status: 200, type: ProductCategory })
  async update(@Param('id') id: number, @Body() body: Partial<ProductCategory>) {
    return this.service.update(id, body);
  }
}
