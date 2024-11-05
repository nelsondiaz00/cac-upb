import Bank from './Bank.js';
import NullEmployee from './NullEmployee.js';
export default class NullBank extends Bank {
    constructor() {
        super('', '', '', new NullEmployee());
    }
    isNull() {
        return true;
    }
}
