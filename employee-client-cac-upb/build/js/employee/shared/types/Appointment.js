export default class Appointment {
    id;
    client;
    type;
    date;
    address;
    description;
    constructor(id, client, type, date, address, description) {
        this.id = id;
        this.client = client;
        this.type = type;
        this.date = date;
        this.address = address;
        this.description = description;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getClient() {
        return this.client;
    }
    setClient(client) {
        this.client = client;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    isAvailable(actualDate) {
        return this.date > actualDate;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    // public save(): void {}
    // public update(): void {}
    // public cancel(): void {}
    isNull() {
        return false;
    }
}
