import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'admin', description: 'user' })
  type: string;

  @ApiProperty({ example: 'password', description: 'password' })
  password: string;
}
