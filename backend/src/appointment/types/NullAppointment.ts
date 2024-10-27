import NullClient from '../../client-component/types/NullClient';
import Appointment from './Appointment';

export default class NullAppointment extends Appointment {
  constructor() {
    super('', new NullClient(), '', new Date(), '', '');
  }

  public override isNull(): boolean {
    return true;
  }
}
