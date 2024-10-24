import NullPerson from '../../../shared/NullPerson.js';
import Appointment from './Appointment.js';
export default class NullAppointment extends Appointment {
    constructor() {
        super('', new NullPerson(), '', new Date(), '', '');
    }
    isNull() {
        return true;
    }
}
