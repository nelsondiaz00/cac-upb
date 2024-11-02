import Appointment from '../../../domain/model/appointment/Appointment';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentDeletedRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentDeletedRecuperatorService';
import IClientUseCase from '../../../domain/port/driver/client/IClientUseCase';
import IAppointmentData from '../../../domain/types/IAppointmentData';
import { getDate } from '../../../util/dates';

export default class AppointmentDeletedRecuperatorService
  implements IAppointmentDeletedRecuperatorService
{
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly clientUseCase: IClientUseCase
  ) {}
  public async recuperatorAll(): Promise<Appointment[]> {
    const DBAppointments = await this.cacUPBRepository.findAppointmentDeleted();
    const appointments = DBAppointments.map(
      async (appointment: IAppointmentData) => {
        return new Appointment(
          appointment.id,
          await this.clientUseCase.getClientById(appointment.client_id),
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
