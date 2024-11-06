import Appointment from '../../../shared/types/Appointment.js';
import Client from '../../../shared/types/Client.js';
import Environment from '../../../shared/types/Environment.js';
import NullClient from '../../../shared/types/NullClient.js';
import Subject from '../types/subject.js';
import AppointmentMasterDetailView from '../view/Appointments-view.js';
export default class AppointmentMasterDetailModel extends Subject<AppointmentMasterDetailView> {
  private appointmentsList: Appointment[];
  private clientList: Client[];
  private actualClient: Client;
  private page: number;

  constructor() {
    super();
    this.clientList = [];
    this.appointmentsList = [];
    this.actualClient = new NullClient();
    this.page = 0;
  }

  public init = async (): Promise<void> => {
    this.appointmentsList = await this.getAllAppointments();
    this.clientList = await this.getAllClients();
    this.setClientByPage(this.page);
  };

  public getClientList = (): Client[] => {
    return this.clientList;
  };

  public getAppointments = (): Appointment[] => {
    return this.appointmentsList;
  };

  public getClient = (): Client => {
    if (!this.actualClient.isNull()) {
      return this.actualClient;
    }
    return new NullClient();
  };

  public getAllClients = async (): Promise<Client[]> => {
    try {
      const uniqueClients = Array.from(
        new Map(
          this.appointmentsList.map((appointment) => [
            appointment.getClient().getIdentification(),
            appointment.getClient(),
          ])
        ).values()
      );

      return uniqueClients;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public getAppointmentsPerClient = (identification: string): Appointment[] => {
    try {
      // Filtra las citas según el identification del cliente
      const filteredAppointments = this.appointmentsList.filter(
        (appointment) =>
          appointment.getClient().getIdentification() === identification
      );

      return filteredAppointments.sort(
        (a: Appointment, b: Appointment) =>
          Number(a.getId()) - Number(b.getId())
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public getAllAppointments = async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(await Environment.getAppointments());
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
          data.description,
          data.notes
        );
      });

      const appointmentsCanceled = await this.getAllAppointmentsCanceled();

      const allAppointments = appointments.concat(appointmentsCanceled);

      return allAppointments;
    } catch (e) {
      console.error(e);
      return [];
    }
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
          data.description,
          data.notes
        );
      });

      return appointments;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public setClientByPage = (page: number): void => {
    if (this.clientList.length === 0) {
      this.page = 0;
      const form = document.querySelector('form') as HTMLFormElement;
      form.reset();
    } else if (page < 0) {
      this.page = this.clientList.length - 1;
      page = this.page;
    }
    this.actualClient = this.clientList[page] || new NullClient();
    this.page = page;
    // console.log('Page: ' + this.page, ' pageee: ' + page);

    this.notifyAllObservers();
  };

  public nextPage = (): void => {
    //  console.log(this.clientList.length);
    if (this.page < this.clientList.length - 1) {
      this.page++;
      this.setClientByPage(this.page);
    } else {
      this.showModal('No hay más registros', 'Error');
      this.page = 0;
      this.setClientByPage(this.page);
    }
  };

  public previousPage = (): void => {
    // console.log(this.actualClient);
    if (this.page > 0) {
      this.page--;
      this.setClientByPage(this.page);
    } else {
      this.showModal('No hay más registros', 'Error');
      this.page = this.clientList.length - 1;
      this.setClientByPage(this.page);
    }
  };

  private showModal = (message: string, title: string): void => {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      const modalTitle = modalElement.querySelector('.modal-title');
      const modalBody = modalElement.querySelector('.modal-body p');
      if (modalTitle) {
        modalTitle.textContent = title;
      }
      if (modalBody) {
        modalBody.textContent = message;
      }
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  };
}
