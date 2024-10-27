import AbstractPerson from './AbstractPerson.js';
export default class Client extends AbstractPerson {
    premium = false;
    constructor(identification, name, lastname, birthday, address, premium) {
        super(identification, name, lastname, birthday, address);
        this.premium = premium;
    }
    isNull() {
        return false;
    }
    isPremium() {
        return this.premium;
    }
    setPremium(premium) {
        this.premium = premium;
    }
}
