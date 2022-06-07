import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHoursEntity } from './hours.entity';
import { UserThemesEntity } from './themes.entity';
import { UsersEntity } from './users.entity';
import { UserTypes } from './users.interface';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private usersEntity: Repository<UsersEntity>,
    @InjectRepository(UserThemesEntity)
    private usersThemesEntity: Repository<UserThemesEntity>,
    @InjectRepository(UserHoursEntity)
    private usersHoursEntity: Repository<UserHoursEntity>,
  ) {}

  async create(name: string, password: string, email: string, type: UserTypes) {
    return this.usersEntity.insert({
      name,
      password,
      type,
      email,
      active: true,
    });
  }

  async createThemes(theme: string, userId: number, institution: string) {
    return this.usersThemesEntity.insert({
      theme,
      userId,
      institution,
    });
  }

  findByLogin(login: string) {
    return this.usersEntity.findOne({ email: login });
  }

  async getThemesByUserId(userId: number) {
    return await this.usersThemesEntity.find({ userId: userId });
  }

  async getHoursByUserId(userId: number) {
    return await this.usersHoursEntity.find({ userId: userId });
  }

  async getThemeById(themeId: number) {
    return this.usersThemesEntity.findOne({ id: themeId });
  }

  async deleteThemeById(themeId: number) {
    return this.usersThemesEntity.delete({ id: themeId });
  }

  async updateThemeById(themeId: number, data: any) {
    return this.usersThemesEntity.update({ id: themeId }, { ...data });
  }

  async getThemes() {
    let themes = await this.usersThemesEntity.find();

    return themes;
  }

  async getUsers() {
    return this.usersEntity.find();
  }

  async getUsersById(userId: number) {
    return await this.usersEntity.findOne({ id: userId });
  }

  async getHours() {
    return this.usersHoursEntity.find();
  }

  async createHour(
    hour: string,
    team: string,
    userId: number,
    themeId: number,
  ) {
    return this.usersHoursEntity.insert({
      themeId,
      userId,
      hour,
      team,
    });
  }

  async deleteHourById(hourId: number) {
    return this.usersHoursEntity.delete({ id: hourId });
  }

  async getHourById(hourId: number) {
    return this.usersHoursEntity.findOne({ id: hourId });
  }

  async updateHourById(themeId: number, data: any) {
    return this.usersHoursEntity.update({ id: themeId }, { ...data });
  }
}
