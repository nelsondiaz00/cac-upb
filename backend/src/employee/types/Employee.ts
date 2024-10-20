import AbstractPerson from '../../shared/AbstractPerson';

export default class Employee extends AbstractPerson {
  constructor(
    identification: string,
    name: string,
    lastname: string,
    birthday: Date,
    address: string
  ) {
    super(identification, name, lastname, birthday, address);
  }

  public isNull(): boolean {
    return false;
  }
}
