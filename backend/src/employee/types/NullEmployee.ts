import Employee from './Employee';

export default class NullEmployee extends Employee {
  constructor() {
    super('', '', '', new Date(), '', '', '', 'EMPLOYEE');
  }
  override isNull() {
    return true;
  }
}
