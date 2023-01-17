import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async create(file): Promise<string> {
    try {
      const name = file.originalname.split('.').shift();
      const extension = file.mimetype.split('/').pop();
      const fileName = `${name}.${extension}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return `http://localhost:5000/${fileName}`;
    } catch (e) {
      throw new HttpException(
        'An error occurred while writing the file',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
