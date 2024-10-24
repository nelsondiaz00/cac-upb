import AbstractPerson from '../../shared/AbstractPerson.js';
export default class Client extends AbstractPerson {
    constructor(identification, name, lastname, birthday, address) {
        super(identification, name, lastname, birthday, address);
    }
    isNull() {
        return false;
    }
}
