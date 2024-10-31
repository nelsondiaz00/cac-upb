import NullClient from './NullClient.js';
import Appointment from './Appointment.js';
export default class NullAppointment extends Appointment {
    constructor() {
        super('', new NullClient(), '', new Date(), '', '', '');
    }
    isNull() {
        return true;
    }
}
