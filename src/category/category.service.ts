import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { FilesService } from './../files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private fileService: FilesService,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findById(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  async create(
    dto: CategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const fileName = await this.fileService.create(image);
    const category = await this.categoryRepository.save({
      ...dto,
      img_url: fileName,
    });
    return category;
  }
}
