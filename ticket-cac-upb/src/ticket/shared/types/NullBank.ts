import Bank from './Bank.js';
import NullEmployee from './NullEmployee.js';

export default class NullBank extends Bank {
  constructor() {
    super('', '', '', new NullEmployee());
  }

  override isNull(): boolean {
    return true;
  }
}
