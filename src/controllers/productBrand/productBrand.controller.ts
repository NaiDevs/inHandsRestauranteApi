import { Controller, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ProductBrandService } from './productBrand.service';
import { ProductBrand } from '../../database/dbinhandsRestaurante/productBrand.entity';

@Controller('productBrands')
export class ProductBrandController {
  constructor(private readonly service: ProductBrandService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener marcas paginadas' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, type: [ProductBrand] })
  async getPaged(@Query('page') page = 1, @Query('limit') limit = 10) {
    const [data, total] = await this.service.findAllPaged(Number(page), Number(limit));
    return { data, total };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener todas las marcas (sin paginar)' })
  @ApiResponse({ status: 200, type: [ProductBrand] })
  async getSummary() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener marca por ID' })
  @ApiResponse({ status: 200, type: ProductBrand })
  async getById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva marca' })
  @ApiBody({ type: ProductBrand })
  @ApiResponse({ status: 201, type: ProductBrand })
  async create(@Body() body: Partial<ProductBrand>) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar marca' })
  @ApiBody({ type: ProductBrand })
  @ApiResponse({ status: 200, type: ProductBrand })
  async update(@Param('id') id: number, @Body() body: Partial<ProductBrand>) {
    return this.service.update(id, body);
  }
}
