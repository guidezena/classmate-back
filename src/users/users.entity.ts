import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from './users.interface';

@Entity({
  name: 'users',
  orderBy: {
    id: 'DESC',
  },
})
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  type: UserTypes;

  @Column({ type: 'boolean' })
  active: boolean;
}
