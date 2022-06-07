export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
  themes: Array<string>;
  institution: string;
  type: UserTypes;
}

export enum UserTypes {
  'ADMIN' = 'admin',
  'STUDENT' = 'student',
  'TEACHER' = 'teacher',
}

export interface Address {
  cep: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  street: string;
}
