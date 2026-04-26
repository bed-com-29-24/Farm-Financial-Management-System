import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'oracle',
  username:       process.env.DB_USER,
  password:       process.env.DB_PASSWORD,
  connectString:  process.env.DB_CONNECT_STRING,
  entities:       [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations:     [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize:    false,   // NEVER true in production — use migrations
  logging:        process.env.NODE_ENV === 'development',
  extra: { poolMin: 2, poolMax: 10 },
});
