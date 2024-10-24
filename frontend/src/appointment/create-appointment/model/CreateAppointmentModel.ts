import Client from '../../../client/types/Client.js';
import Environment from '../../../shared/Environment.js';
import NullPerson from '../../../shared/NullPerson.js';
import Appointment from '../../shared/types/Appointment.js';
import Subject from '../../shared/types/Subject.js';
import CreateAppointmentView from '../view/CreateAppointmentView.js';

export default class CreateAppointmentModel extends Subject<CreateAppointmentView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public getUserByIdentification = async (id: string): Promise<Client> => {
    const response = await fetch(
      await Environment.getClientByIdentification(id)
    );
    if (response.status !== 200) {
      return new NullPerson();
    }

    try {
      const responseData = await response.json();
      const client = new Client(
        responseData.identification,
        responseData.name,
        responseData.lastname,
        responseData.birthday,
        responseData.address
      );
      return client;
    } catch (e) {
      console.log('acá');
      return new NullPerson();
    }
  };

  public createAppointment = async (
    appointment: Appointment
  ): Promise<boolean> => {
    console.log(appointment);
    const response = await fetch(await Environment.createAppointment(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment,
      }),
    });
    // const errorData = await response.json();
    if (response.status !== 201) {
      console.log('Error creating appointment');
      return false;
    } else {
      console.log('Appointment created');
      return true;
    }
  };
}
