import AbstractPerson from './AbstractPerson.js';
export default class Employee extends AbstractPerson {
    email;
    password;
    role;
    constructor(identification, name, lastname, birthday, address, email, password, role) {
        super(identification, name, lastname, birthday, address);
        this.email = email;
        this.password = password;
        this.role = role;
    }
    isNull() {
        return false;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
}
