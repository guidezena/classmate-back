import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from './users.interface';

@Entity({
  name: 'userThemes',
  orderBy: {
    id: 'DESC',
  },
})
export class UserThemesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ length: 500 })
  theme: string;

  @Column({ length: 500 })
  institution: string;
}
