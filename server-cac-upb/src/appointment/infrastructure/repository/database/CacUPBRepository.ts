import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';
import IAppointmentData from '../../../domain/types/IAppointmentData';
import IClient from '../../../domain/types/IClientData';
import CacUPBDB from './CacUPBDB';

export default class CacUPBRepository implements ICacUPBRepository {
  private readonly CacUPBDB: CacUPBDB;
  constructor() {
    this.CacUPBDB = new CacUPBDB();
  }
  async saveAppointment(appointment: IAppointmentClientData): Promise<boolean> {
    try {
      const result = await this.CacUPBDB.createAppointment(appointment);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteAppointmentById(id: string): Promise<boolean> {
    try {
      const result = await this.CacUPBDB.deleteAppointment(id);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async updateAppointment(
    appointment: IAppointmentClientData
  ): Promise<boolean> {
    try {
      const result = await this.CacUPBDB.updateAppointment(appointment);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findAppointmentDeleted(): Promise<IAppointmentData[]> {
    try {
      const appointmentsData = await this.CacUPBDB.getDeletedAppointments();
      return appointmentsData.map((appointmentData: any) => {
        return {
          id: appointmentData.id.toString(),
          client_id: appointmentData.client_id.toString(),
          type: appointmentData.type,
          date: appointmentData.date,
          address: appointmentData.address,
          description: appointmentData.description,
          notes: appointmentData.notes,
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findAllAppointments(): Promise<IAppointmentData[]> {
    try {
      const appointmentsData = await this.CacUPBDB.getAppointments();
      return appointmentsData.map((appointmentData: any) => {
        return {
          id: appointmentData.id.toString(),
          client_id: appointmentData.client_id.toString(),
          type: appointmentData.type,
          date: appointmentData.date,
          address: appointmentData.address,
          description: appointmentData.description,
          notes: appointmentData.notes,
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findAppointmentById(id: string): Promise<IAppointmentData> {
    try {
      const appointment = await this.CacUPBDB.getAppointmentById(id);
      return {
        id: appointment.id.toString(),
        client_id: appointment.client_id.toString(),
        type: appointment.type,
        date: appointment.date,
        address: appointment.address,
        description: appointment.description,
        notes: appointment.notes,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        client_id: '',
        type: '',
        date: '',
        address: '',
        description: '',
        notes: '',
      };
    }
  }
  async findClientById(id: string): Promise<IClient> {
    try {
      // console.log(identification);
      const client = await this.CacUPBDB.getClientById(id);
      // console.log(client);
      return {
        id: client.id,
        name: client.name,
        lastname: client.lastname,
        identification: client.identification,
        birthdate: client.birthday,
        address: client.address,
        premium: client.premium,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        name: '',
        lastname: '',
        identification: '',
        birthdate: '',
        address: '',
        premium: '',
      };
    }
  }
  async findClientByIdentification(identification: string): Promise<IClient> {
    try {
      console.log(identification);
      const client = await this.CacUPBDB.getClientByIdentification(
        identification
      );
      // console.log(client);
      return {
        id: client.id,
        name: client.name,
        lastname: client.lastname,
        identification: client.identification,
        birthdate: client.birthday,
        address: client.address,
        premium: client.premium,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        name: '',
        lastname: '',
        identification: '',
        birthdate: '',
        address: '',
        premium: '',
      };
    }
  }
}
