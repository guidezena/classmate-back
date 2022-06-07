import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
  ],

  providers: [JwtStrategy, AuthenticationService],
  exports: [AuthenticationModule, AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
