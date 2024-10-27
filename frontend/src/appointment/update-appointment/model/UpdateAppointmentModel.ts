import Client from '../../../client/types/Client.js';
import NullClient from '../../../client/types/NullClient.js';
import Environment from '../../../shared/Environment.js';
import Appointment from '../../shared/types/Appointment.js';
import NullAppointment from '../../shared/types/NullAppointment.js';
import Subject from '../../shared/types/Subject.js';
import UpdateAppointmentView from '../../update-appointment/view/UpdateAppointmentView.js';

export default class UpdateAppointmentModel extends Subject<UpdateAppointmentView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public getAppointmentById = async (id: string): Promise<Appointment> => {
    try {
      const response = await fetch(await Environment.getAppointmentById(id));
      if (response.status !== 200) {
        return new NullAppointment();
      }

      const responseData = await response.json();

      console.log(responseData);

      const client = new Client(
        responseData.client.identification,
        responseData.client.name,
        responseData.client.lastname,
        responseData.client.birthday,
        responseData.client.address,
        responseData.client.premium
      );

      const appointment = new Appointment(
        responseData.id,
        client,
        responseData.type,
        responseData.date,
        responseData.address,
        responseData.description
      );

      return appointment;
    } catch (e) {
      return new NullAppointment();
    }
  };

  public getUserByIdentification = async (id: string): Promise<Client> => {
    const response = await fetch(
      await Environment.getClientByIdentification(id)
    );
    if (response.status !== 200) {
      return new NullClient();
    }
    try {
      const responseData = await response.json();
      const client = new Client(
        responseData.identification,
        responseData.name,
        responseData.lastname,
        responseData.birthday,
        responseData.address,
        responseData.premium
      );
      return client;
    } catch (e) {
      return new NullClient();
    }
  };

  public updateAppointment = async (
    appointment: Appointment
  ): Promise<boolean> => {
    console.log(appointment);
    try {
      const info = {
        id: appointment.getId(),
        client_identification: appointment.getClient().getIdentification(),
        type: appointment.getType(),
        date: appointment.getDate(),
        address: appointment.getAddress(),
        description: appointment.getDescription(),
      };
      console.log(info);
      const response = await fetch(await Environment.updateAppointment(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      const errorData = await response.json();
      console.log(errorData);
      if (response.status !== 200) {
        console.log('Error updating appointment');
        return false;
      } else {
        console.log('Appointment updated');
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  public deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(await Environment.deleteAppointment(id), {
        method: 'DELETE',
      });
      if (response.status !== 200) {
        console.log('Error deleting appointment');
        return false;
      } else {
        console.log('Appointment deleted');
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
