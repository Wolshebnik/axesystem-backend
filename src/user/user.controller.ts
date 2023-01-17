import { Body, Controller } from '@nestjs/common';
import { HttpCode, Post } from '@nestjs/common/decorators';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({
    type: UserEntity,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @Post('create')
  async create(@Body() { type, password }: UserDto): Promise<UserEntity> {
    return await this.userService.createUser({ type, password });
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ status: 200, type: UserEntity })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: UserDto): Promise<UserEntity> {
    return await this.userService.login(body);
  }
}
