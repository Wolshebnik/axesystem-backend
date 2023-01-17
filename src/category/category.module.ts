import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { FilesModule } from './../files/files.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), FilesModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
