import Appointment from '../../domain/model/appointment/Appointment';
import IAppointmentCreateService from '../../domain/port/driver/appointment/IAppointmentCreateService';
import IAppointmentDeletedRecuperatorService from '../../domain/port/driver/appointment/IAppointmentDeletedRecuperatorService';
import IAppointmentDeleteService from '../../domain/port/driver/appointment/IAppointmentDeleteService';
import IAppointmentRecuperatorService from '../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import IAppointmentUpdateService from '../../domain/port/driver/appointment/IAppointmentUpdateService';
import IAppointmentUseCase from '../../domain/port/driver/appointment/IAppointmentUseCase';
import IAppointmentClientData from '../../domain/types/IAppointmentClientData';

export default class AppointmentUseCase implements IAppointmentUseCase {
  constructor(
    private readonly appointmentRecuperatorService: IAppointmentRecuperatorService,
    private readonly appointmentCreatorService: IAppointmentCreateService,
    private readonly appointmentUpdaterService: IAppointmentUpdateService,
    private readonly appointmentDeleterService: IAppointmentDeleteService,
    private readonly appointmentDeletedRecuperatorService: IAppointmentDeletedRecuperatorService
  ) {}
  createAppointment(appointment: IAppointmentClientData): Promise<boolean> {
    return this.appointmentCreatorService.create(appointment);
  }
  updateAppointment(appointment: IAppointmentClientData): Promise<boolean> {
    return this.appointmentUpdaterService.update(appointment);
  }
  deleteAppointment(id: string): Promise<boolean> {
    return this.appointmentDeleterService.delete(id);
  }
  getAppointmentsDeleted(): Promise<Appointment[]> {
    return this.appointmentDeletedRecuperatorService.recuperatorAll();
  }
  getAppointmentById(id: string): Promise<Appointment> {
    return this.appointmentRecuperatorService.recuperatorById(id);
  }
  getAppointments(): Promise<Appointment[]> {
    return this.appointmentRecuperatorService.recuperatorAll();
  }
}
