import {
  Get,
  Body,
  Post,
  Param,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoryService.findById(id);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 404, description: 'NOT FOUND' })
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({})
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string' },
  //       img: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    type: CategoryEntity,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() dto: CategoryDto,
    @UploadedFile() image,
  ): Promise<CategoryEntity> {
    return await this.categoryService.create(dto, image);
  }
}
