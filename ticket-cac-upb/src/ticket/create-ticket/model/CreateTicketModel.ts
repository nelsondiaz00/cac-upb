import Environment from '../../shared/types/Environment.js';
import Subject from '../../shared/types/Subject.js';
import CreateTicketView from '../view/CreateTicketView.js';

export default class CreateTicketModel extends Subject<CreateTicketView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public createAppointment = async (idAppointment: string): Promise<string> => {
    console.log(idAppointment);
    const response = await fetch(
      await Environment.createTicket(idAppointment),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response.status);
    if (response.ok) {
      console.log('Appointment created');
      const data = await response.json();
      return data.turn;
    } else {
      console.log('Error creating appointment');
      return '';
    }
  };
}
