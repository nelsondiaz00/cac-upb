import AbstractPerson from '../../shared/AbstractPerson';
import { RoleEmployee } from './RoleEmployee';

export default class Employee extends AbstractPerson {
  email: string;
  password: string;
  role: RoleEmployee;
  constructor(
    identification: string,
    name: string,
    lastname: string,
    birthday: Date,
    address: string,
    email: string,
    password: string,
    role: RoleEmployee
  ) {
    super(identification, name, lastname, birthday, address);
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public isNull(): boolean {
    return false;
  }
}
