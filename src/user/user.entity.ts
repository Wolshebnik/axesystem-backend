import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Unique(['type'])
@Entity('users')
export class UserEntity {
  @ApiProperty({ example: 'c77184ec-a8d2-4d29-bdd3-08202b6bce54' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ example: 'admin' })
  @Column()
  type: string;

  @ApiProperty({ example: 'password' })
  @Column()
  password: string;
}
