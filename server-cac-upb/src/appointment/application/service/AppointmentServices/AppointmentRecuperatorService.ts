import Appointment from '../../../domain/model/appointment/Appointment';
import NullAppointment from '../../../domain/model/appointment/NullAppointment';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import IClientRecuperatorService from '../../../domain/port/driver/client/IClientRecuperatorService';
import IAppointmentData from '../../../domain/types/IAppointmentData';
import { getDate } from '../../../util/dates';

export default class AppointmentRecuperatorService
  implements IAppointmentRecuperatorService
{
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly clientRecuperatorService: IClientRecuperatorService
  ) {}
  async recuperatorById(id: string): Promise<Appointment> {
    const DBAppointment = await this.cacUPBRepository.findAppointmentById(id);
    if (DBAppointment.id === '' || DBAppointment === undefined)
      return new NullAppointment();
    return new Appointment(
      DBAppointment.id,
      await this.clientRecuperatorService.recuperatorById(
        DBAppointment.client_id
      ),
      DBAppointment.type,
      getDate(DBAppointment.date),
      DBAppointment.address,
      DBAppointment.description,
      DBAppointment.notes
    );
  }
  public async recuperatorAll(): Promise<Appointment[]> {
    const DBAppointments = await this.cacUPBRepository.findAllAppointments();
    const appointments = DBAppointments.map(
      async (appointment: IAppointmentData) => {
        return new Appointment(
          appointment.id,
          await this.clientRecuperatorService.recuperatorById(
            appointment.client_id
          ),
          appointment.type,
          getDate(appointment.date),
          appointment.address,
          appointment.description,
          appointment.notes
        );
      }
    );

    return Promise.all(appointments);
  }
}
