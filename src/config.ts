import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (config: ConfigService) => ({
  type: config.get<'postgres'>('TYPEORM_CONNECTION'),
  username: config.get<string>('TYPEORM_USERNAME'),
  password: config.get<string>('TYPEORM_PASSWORD'),
  database: config.get<string>('TYPEORM_DATABASE'),
  port: config.get<number>('TYPEORM_PORT'),
  entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
});
