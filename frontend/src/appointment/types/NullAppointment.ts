import NullPerson from '../../shared/NullPerson';
import Appointment from './Appointment';

export default class NullAppointment extends Appointment {
  constructor() {
    super('', new NullPerson(), '', new Date(), '', '');
  }

  public override isNull(): boolean {
    return true;
  }
}
