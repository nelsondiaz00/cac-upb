import NullAppointment from '../../../shared/types/NullAppointment';
import Ticket from './Ticket';
export default class NullTicket extends Ticket {
    constructor() {
        super('', new NullAppointment());
    }
    isNull() {
        return true;
    }
}
