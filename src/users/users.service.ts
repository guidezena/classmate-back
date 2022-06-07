import { Injectable } from '@nestjs/common';
import { utils } from 'src/utils';

import { CreateUserInterface, UserTypes } from './users.interface';
import { UserRepository } from './users.repository';
import { UsersValidators } from './users.validators';
import { generate } from 'password-hash';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userValidator: UsersValidators,
  ) {}

  verifyIsAdmin(userType: UserTypes) {
    if (userType !== UserTypes.ADMIN) {
      return utils.makeException(['Só o admin tem permissão '], 400);
    }
  }

  validateThemes(themes: Array<string>) {
    const allowedThemes = ['inglês', 'português', 'matemática', 'física'];

    let notAllowedThemes = [];

    themes.forEach((t) => {
      if (allowedThemes.indexOf(t) < 0) {
        notAllowedThemes.push(t);
      }
    });

    if (notAllowedThemes[0]) {
      return utils.makeException(
        ['A(s) seguintes aulas não são válidas: ' + notAllowedThemes.join(',')],
        400,
      );
    }
  }

  async getUsers(userType: UserTypes) {
    this.verifyIsAdmin(userType);
    return this.userRepository.getUsers();
  }

  async createUser(data: CreateUserInterface, userType: UserTypes) {
    this.verifyIsAdmin(userType);
    try {
      await this.userValidator.validateCreateUser(data);
    } catch (e) {
      return utils.makeException(e.errors, 400);
    }

    let alreadyExistByEmail = await this.userRepository.findByLogin(data.email);
    if (alreadyExistByEmail) {
      return utils.makeException(['E-mail já cadastrado'], 400);
    }

    this.validateThemes(data.themes);

    let user = await this.userRepository.create(
      data.name,
      generate(data.password),
      data.email,
      data.type,
    );

    for (const theme of data.themes) {
      await this.userRepository.createThemes(
        theme,
        user.raw.insertId,
        data.institution,
      );
    }

    return { msg: 'Usúario criado com sucesso' };
  }

  async findUserByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }

  async findAdminThemes(type: UserTypes) {
    this.verifyIsAdmin(type);
    let themes = await this.userRepository.getThemes();
    let users = await this.userRepository.getUsers();

    return users.map((u) => {
      let user: any = u;
      user.themes = themes.filter((f) => f.userId === u.id);

      return user;
    });
  }

  async findThemes(userId: string) {
    return this.userRepository.getThemesByUserId(parseInt(userId));
  }

  async addTheme(
    body: { theme: string; institution: string; userId: string },
    type: UserTypes,
  ) {
    this.verifyIsAdmin(type);
    this.validateThemes([body.theme]);

    await this.userRepository.createThemes(
      body.theme,
      parseInt(body.userId),
      body.institution,
    );

    return { msg: 'Matéria adicionada com sucesso' };
  }

  async updateTheme(
    body: { theme: string; institution: string },
    userId: string,
    type: UserTypes,
  ) {
    this.verifyIsAdmin(type);
    this.validateThemes([body.theme]);

    await this.userRepository.createThemes(
      body.theme,
      parseInt(userId),
      body.institution,
    );

    return { msg: 'Matéria adicionada com sucesso' };
  }

  async findThemeById(themeId: string, type: UserTypes) {
    this.verifyIsAdmin(type);
    let theme = await this.userRepository.getThemeById(parseInt(themeId));

    let user = await this.userRepository.getUsersById(theme.userId);

    return { theme: theme.theme, institution: theme.institution, ...user };
  }

  async deleteThemeById(themeId: string, type: UserTypes) {
    this.verifyIsAdmin(type);

    await this.userRepository.deleteThemeById(parseInt(themeId));

    return { msg: 'Deletado com sucesso' };
  }

  async updateThemeById(
    themeId: string,
    type: UserTypes,
    body: { institution: string; theme: string },
  ) {
    this.verifyIsAdmin(type);
    this.validateThemes([body.theme]);

    const updateValue: any = {};
    if (body.institution) {
      updateValue.institution = body.institution;
    }
    if (body.theme) {
      updateValue.theme = body.theme;
    }

    await this.userRepository.updateThemeById(parseInt(themeId), updateValue);

    return { msg: 'Atualizado com sucesso' };
  }

  async findAdminHours(type: UserTypes) {
    this.verifyIsAdmin(type);
    let hours = await this.userRepository.getHours();
    let users = await this.userRepository.getUsers();
    let themes = await this.userRepository.getThemes();

    let usersMap = users.map((u) => {
      let user: any = u;
      user.hours = hours.filter((f) => f.userId === u.id);

      user.hours = user.hours.map((h) => {
        h.themes = themes.filter((t) => {
          return h.themeId === t.id;
        });

        return h;
      });

      return user;
    });

    return usersMap.filter((u) => u.hours[0]);
  }

  async addHour(
    body: { hour: string; team: string; userId: number; themeId: number },
    type: UserTypes,
  ) {
    this.verifyIsAdmin(type);

    await this.userRepository.createHour(
      body.hour,
      body.team,
      body.userId,
      body.themeId,
    );

    return { msg: 'Hora adicionada com sucesso' };
  }

  async deleteHourById(themeId: string, type: UserTypes) {
    this.verifyIsAdmin(type);

    await this.userRepository.deleteHourById(parseInt(themeId));

    return { msg: 'Deletado com sucesso' };
  }

  async findHourById(hourId: string, type: UserTypes) {
    this.verifyIsAdmin(type);
    let hour = await this.userRepository.getHourById(parseInt(hourId));
    let theme = await this.userRepository.getThemeById(hour.themeId);

    return { theme, hour };
  }

  async updateHourById(
    themeId: string,
    type: UserTypes,
    body: { team: string; hour: string; theme: string },
  ) {
    this.verifyIsAdmin(type);
    this.validateThemes([body.theme]);

    const updateValue: any = {};
    if (body.team) {
      updateValue.team = body.team;
    }

    if (body.hour) {
      updateValue.hour = body.hour;
    }

    await this.userRepository.updateHourById(parseInt(themeId), updateValue);

    return { msg: 'Atualizado com sucesso' };
  }

  async findHours(userId: string) {
    let hours = await this.userRepository.getHoursByUserId(parseInt(userId));
    let theme = await this.userRepository.getThemesByUserId(parseInt(userId));

    let hoursWithThemes: any = [];

    for (const hour of hours) {
      let findTheme = theme.find((t) => hour.themeId === t.id);
      if (!findTheme) return;

      hoursWithThemes.push({ ...hour, theme: findTheme });
    }

    return hoursWithThemes;
  }
}
