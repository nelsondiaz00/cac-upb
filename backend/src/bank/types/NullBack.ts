import Employee from '../../employee/types/Employee';
import NullPerson from '../../shared/NullPerson';
import Bank from './Bank';

export default class NullBank extends Bank {
  constructor() {
    super(new NullPerson() as Employee);
  }

  public isNull(): boolean {
    return true;
  }
}
