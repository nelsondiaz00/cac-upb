import NullAppointment from '../../appointment/types/NullAppointment';
import Ticket from './Ticket';

export default class NullTicket extends Ticket {
  constructor() {
    super('', new NullAppointment());
  }

  public override isNull(): boolean {
    return true;
  }
}
