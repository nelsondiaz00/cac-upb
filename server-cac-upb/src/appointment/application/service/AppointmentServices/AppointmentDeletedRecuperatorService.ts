import Appointment from '../../../domain/model/appointment/Appointment';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentDeletedRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentDeletedRecuperatorService';
import IClientRecuperatorService from '../../../domain/port/driver/client/IClientRecuperatorService';
import IAppointmentData from '../../../domain/types/IAppointmentData';
import { getDate } from '../../../util/dates';

export default class AppointmentDeletedRecuperatorService
  implements IAppointmentDeletedRecuperatorService
{
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly clientRecuperatorService: IClientRecuperatorService
  ) {}
  public async recuperatorAll(): Promise<Appointment[]> {
    const DBAppointments = await this.cacUPBRepository.findAppointmentDeleted();
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
