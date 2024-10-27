import NullClient from './NullClient.js';
import Appointment from './Appointment';

export default class NullAppointment extends Appointment {
  constructor() {
    super('', new NullClient(), '', new Date(), '', '');
  }

  public override isNull(): boolean {
    return true;
  }
}
