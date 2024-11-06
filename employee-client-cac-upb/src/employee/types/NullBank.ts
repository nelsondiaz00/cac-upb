import NullEmployee from '../../shared/types/NullEmployee.js';
import Bank from './Bank.js';

export default class NullBank extends Bank {
  constructor() {
    super('', '', '', new NullEmployee());
  }

  override isNull(): boolean {
    return true;
  }
}
