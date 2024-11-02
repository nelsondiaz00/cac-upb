import NullAppointment from '../../shared/types/NullAppointment.js';
import Ticket from './Ticket.js';
export default class NullTicket extends Ticket {
    constructor() {
        super('', new NullAppointment());
    }
    isNull() {
        return true;
    }
}
