import Client from './Client.js';
export default class NullClient extends Client {
    constructor() {
        super('', '', '', new Date(), '', false);
    }
    isNull() {
        return true;
    }
}
