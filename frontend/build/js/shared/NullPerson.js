import AbstractPerson from './AbstractPerson.js';
export default class NullPerson extends AbstractPerson {
    constructor() {
        super('', '', '', new Date(), '');
    }
    isNull() {
        return true;
    }
}
