import NullEmployee from '../employee/NullEmployee';
import Bank from './Bank';

export default class NullBank extends Bank {
  constructor() {
    super('', '', '', new NullEmployee());
  }

  override isNull(): boolean {
    return true;
  }
}
