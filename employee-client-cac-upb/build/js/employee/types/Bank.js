import NullTicket from './NullTicket.js';
export default class Bank {
    id;
    name;
    address;
    employee;
    ticket;
    constructor(id, name, address, employee) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.employee = employee;
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getAddress() {
        return this.address;
    }
    set setAddress(address) {
        this.address = address;
    }
    get getEmployee() {
        return this.employee;
    }
    set setEmployee(employee) {
        this.employee = employee;
    }
    get getTicket() {
        if (this.ticket) {
            return this.ticket;
        }
        return new NullTicket();
    }
    set setTicket(ticket) {
        this.ticket = ticket;
    }
    isNull() {
        return false;
    }
}
