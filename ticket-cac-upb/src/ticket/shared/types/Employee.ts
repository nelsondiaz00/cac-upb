import AbstractPerson from './AbstractPerson.js';
import { RoleEmployee } from './RoleEmployee.js';

export default class Employee extends AbstractPerson {
  private email: string;
  private password: string;
  private role: RoleEmployee;
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

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): RoleEmployee {
    return this.role;
  }
}
