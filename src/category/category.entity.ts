import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Content } from '../content.entity';

@Entity('categories')
export class CategoryEntity extends Content {
  @ApiProperty({ example: 'title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'image.jpeg' })
  @Column()
  img_url: string;
}
