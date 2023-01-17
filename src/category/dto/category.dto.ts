import { ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from './../../files/file.dto';

export class CategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  img: FileUploadDto;
}
