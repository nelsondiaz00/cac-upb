import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';
import IAppointmentData from '../../../domain/types/IAppointmentData';
import IBankData from '../../../domain/types/IBankData';
import IClientData from '../../../domain/types/IClientData';
import IEmployeeData from '../../../domain/types/IEmployeeData';
import ITicketData from '../../../domain/types/ITicketData';
import CacUPBDB from './CacUPBDB';

export default class CacUPBRepository implements ICacUPBRepository {
  private readonly CacUPBDB: CacUPBDB;
  constructor() {
    this.CacUPBDB = new CacUPBDB();
  }

  async findBankByIdTicket(turn: string): Promise<IBankData> {
    try {
      return await this.CacUPBDB.getBankByTicket(turn);
    } catch (error) {
      console.log(error);
      return {
        id: '',
        employee_id: '',
        current_ticket_turn: '',
        name: '',
        address: '',
      };
    }
  }
  async updateBank(
    turn: string,
    identificationEmployee: string
  ): Promise<boolean> {
    try {
      return await this.CacUPBDB.updateBank(turn, identificationEmployee);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findEmployees(): Promise<IEmployeeData[]> {
    try {
      const employeesData = await this.CacUPBDB.getEmployees();
      return employeesData.map((ticketData: any): IEmployeeData => {
        return {
          id: ticketData.id,
          name: ticketData.name,
          lastname: ticketData.lastname,
          identification: ticketData.identification,
          birthday: ticketData.birthdate,
          address: ticketData.address,
          email: ticketData.email,
          password: ticketData.password,
          role: ticketData.role,
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findEmployeeByEmail(email: string): Promise<IEmployeeData> {
    try {
      const employeeData = await this.CacUPBDB.getEmployeeByEmail(email);
      return {
        id: employeeData.id,
        name: employeeData.name,
        lastname: employeeData.lastname,
        identification: employeeData.identification,
        birthday: employeeData.birthdate,
        address: employeeData.address,
        email: employeeData.email,
        password: employeeData.password,
        role: employeeData.role,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        name: '',
        lastname: '',
        identification: '',
        birthday: '',
        address: '',
        email: '',
        password: '',
        role: '',
      };
    }
  }
  async findEmployeeById(id: string): Promise<IEmployeeData> {
    try {
      const employeeData = await this.CacUPBDB.getAppointmentById(id);
      return {
        id: employeeData.id,
        name: employeeData.name,
        lastname: employeeData.lastname,
        identification: employeeData.identification,
        birthday: employeeData.birthdate,
        address: employeeData.address,
        email: employeeData.email,
        password: employeeData.password,
        role: employeeData.role,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        name: '',
        lastname: '',
        identification: '',
        birthday: '',
        address: '',
        email: '',
        password: '',
        role: '',
      };
    }
  }
  async saveEmployee(employee: IEmployeeData): Promise<boolean> {
    try {
      return await this.CacUPBDB.createEmployee(employee);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findTicketById(id: string): Promise<ITicketData> {
    try {
      const ticketData = await this.CacUPBDB.getTicketById(id);
      return {
        id: ticketData.id.toString(),
        turn: ticketData.turn,
        appointment_id: ticketData.appointment_id,
        state: ticketData.state,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        turn: '',
        appointment_id: '',
        state: '',
      };
    }
  }
  async findAllTickets(): Promise<ITicketData[]> {
    try {
      const ticketsData = await this.CacUPBDB.getTickets();

      return ticketsData.map((ticketData: any): ITicketData => {
        return {
          id: ticketData.id.toString(),
          turn: ticketData.turn,
          appointment_id: ticketData.appointment_id,
          state: ticketData.state,
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async saveTicket(idAppointment: string): Promise<ITicketData> {
    try {
      const ticketData = await this.CacUPBDB.createTicket(idAppointment);
      return {
        id: ticketData.id.toString(),
        turn: ticketData.turn,
        appointment_id: ticketData.appointment_id,
        state: ticketData.state,
      };
    } catch (error) {
      console.log(error);
      return {
        id: '',
        turn: '',
        appointment_id: '',
        state: '',
      };
    }
  }
  async deleteTicketById(id: string): Promise<boolean> {
    try {
      return this.CacUPBDB.deleteTicket(id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deactiveTicket(idAppointment: string): Promise<boolean> {
    try {
      return this.CacUPBDB.deactiveTicket(idAppointment);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findTicketsQueue(): Promise<ITicketData[]> {
    try {
      const ticketsData = await this.CacUPBDB.getQueue();

      return ticketsData.map((ticketData: any): ITicketData => {
        return {
          id: ticketData.id.toString(),
          turn: ticketData.turn,
          appointment_id: ticketData.appointment_id,
          state: ticketData.state,
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async saveAppointment(appointment: IAppointmentClientData): Promise<string> {
    try {
      const result = await this.CacUPBDB.createAppointment(appointment);
      if (result) {
        return result;
      } else {
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
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
      return appointmentsData.map((appointmentData: any): IAppointmentData => {
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
      return appointmentsData.map((appointmentData: any): IAppointmentData => {
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
  async findClientById(id: string): Promise<IClientData> {
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
  async findClientByIdentification(
    identification: string
  ): Promise<IClientData> {
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
