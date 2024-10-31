export default class AbstractPerson {
    identification;
    name;
    lastname;
    birthday;
    address;
    _isNull;
    constructor(identification, name, lastname, birthday, address) {
        this.identification = identification;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.address = address;
        this._isNull = false;
    }
    // Getters
    getIdentification() {
        return this.identification;
    }
    getName() {
        return this.name;
    }
    getLastname() {
        return this.lastname;
    }
    getBirthday() {
        if (this.birthday instanceof Date) {
            return this.birthday;
        }
        return new Date(this.birthday);
    }
    getAddress() {
        return this.address;
    }
    isNullValue() {
        return this._isNull;
    }
    // Setters
    setIdentification(identification) {
        this.identification = identification;
    }
    setName(name) {
        this.name = name;
    }
    setLastname(lastname) {
        this.lastname = lastname;
    }
    setBirthday(birthday) {
        this.birthday = birthday;
    }
    setAddress(address) {
        this.address = address;
    }
    setNullValue(isNull) {
        this._isNull = isNull;
    }
}
