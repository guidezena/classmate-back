import { PromModule } from '@digikare/nestjs-prom';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

let modules: any = [
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  PromModule.forRoot({
    withHttpMiddleware: {
      enable: true,
    },
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      connectTimeout: 20000,
    }),
  }),
  HealthModule,
  AuthenticationModule,
  UsersModule,
];

@Module({
  imports: modules,
})
export class AppModule {}
