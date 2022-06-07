import { Injectable } from '@nestjs/common';
import { utils } from 'src/utils';
import { Address, CreateUserInterface } from './users.interface';
import * as yup from 'yup';

const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

@Injectable()
export class UsersValidators {
  constructor() {}

  async validateCreateUser(data: CreateUserInterface) {
    let validator = yup.object({
      email: yup
        .string()
        .required('E-mail obrigatório')
        .email('E-mail inválido'),
      name: yup.string().required('Nome é obrigatório'),
      password: yup.string().required('Senha obrigatória'),
      institution: yup.string().required('Instituição obrigatória'),
      themes: yup
        .array()
        .min(1, 'Máteria é obrigatória')
        .required('Máteria é obrigatória'),
      type: yup
        .string()
        .oneOf(['student', 'teacher'], 'Tipo não aceito')
        .required('Tipo é obrigatório'),
    });

    return validator.validate(data, yupConfig);
  }

  async validateAddress(data: Address) {
    let validator = yup.object({
      number: yup
        .string()
        .required('Número é obrigatório, caso seja sem número digite s/n')
        .test(async function (number: any) {
          const { path, createError } = this;

          try {
            number = parseInt(number);
          } catch {
            if (number !== 's/n') {
              return createError({ path, message: 'Número é inválido' });
            }
          }

          return true;
        }),
      street: yup.string().required('Logradouro é obrigatório'),
      neighborhood: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      state: yup.string().required('Estado é obrigatório'),
      country: yup.string().required('País é obrigatório'),
      cep: yup
        .string()
        .required('CEP é obrigatório')
        .test(async function (cep: string) {
          const { path, createError } = this;

          if (cep.length !== 8) {
            return createError({ path, message: 'CEP é inválido' });
          }

          return true;
        }),
    });

    return validator.validate(data, yupConfig);
  }
}
