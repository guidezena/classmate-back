import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from './users.interface';

@Entity({
  name: 'userHours',
  orderBy: {
    id: 'DESC',
  },
})
export class UserHoursEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  themeId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ length: 500 })
  team: string;

  @Column({ length: 500 })
  hour: string;
}
