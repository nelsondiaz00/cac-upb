import Appointment from './Appointment.js';
import NullClient from './NullClient.js';
export default class NullAppointment extends Appointment {
    constructor() {
        super('', new NullClient(), '', new Date(), '', '', '');
    }
    isNull() {
        return true;
    }
}
