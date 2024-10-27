import Appointment from '../../shared/types/Appointment.js';
import Client from '../../shared/types/Client.js';
import Environment from '../../shared/types/Environment.js';
import Subject from '../../shared/types/Subject.js';
import ShowCancelAppointmentView from '../view/ShowCancelAppointmentView.js';

export default class ShowCancelAppointmentModel extends Subject<ShowCancelAppointmentView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public getAllAppointmentsCanceled = async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(await Environment.getAppointmentsCanceled());
      if (!response.ok) {
        return [];
      }

      const responseData = await response.json();

      console.log(responseData);

      const appointments: Appointment[] = responseData.map((data: any) => {
        const client = new Client(
          data.client.identification,
          data.client.name,
          data.client.lastname,
          data.client.birthday,
          data.client.address,
          data.client.premium
        );

        return new Appointment(
          data.id,
          client,
          data.type,
          data.date,
          data.address,
          data.description
        );
      });

      return appointments;
    } catch (e) {
      console.error(e);
      return [];
    }
  };
}
