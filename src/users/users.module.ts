import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserHoursEntity } from './hours.entity';
import { UserThemesEntity } from './themes.entity';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersValidators } from './users.validators';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UserThemesEntity, UserHoursEntity]),
    forwardRef(() => AuthenticationModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UsersValidators,
    UsersEntity,
    UserThemesEntity,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
