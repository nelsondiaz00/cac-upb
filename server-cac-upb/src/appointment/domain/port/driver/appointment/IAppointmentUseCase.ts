import Appointment from '../../../model/appointment/Appointment';
import IAppointmentClientData from '../../../types/IAppointmentClientData';

export default interface IAppointmentUseCase {
  getAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: string): Promise<Appointment>;
  createAppointment(appointment: IAppointmentClientData): Promise<string>;
  updateAppointment(appointment: IAppointmentClientData): Promise<boolean>;
  deleteAppointment(id: string): Promise<boolean>;
  getAppointmentsDeleted(): Promise<Appointment[]>;
}
