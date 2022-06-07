import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'password-hash';
import { UserTypes } from 'src/users/users.interface';

import { UsersService } from '../users/users.service';
import { utils } from '../utils';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: { email: string; password: string }) {
    const user = await this.usersService.findUserByLogin(body.email);

    if (!user) {
      return utils.makeException(['Login ou senha inválidos'], 400);
    }

    if (!verify(body.password, user.password)) {
      return utils.makeException(['Login ou senha inválidos'], 400);
    }

    if (user.type === UserTypes.STUDENT) {
      return utils.makeException(['Login apenas para professor e admin'], 400);
    }

    return {
      accessToken: `Bearer ${this.jwtService.sign({
        userId: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      })}`,
    };
  }
}
