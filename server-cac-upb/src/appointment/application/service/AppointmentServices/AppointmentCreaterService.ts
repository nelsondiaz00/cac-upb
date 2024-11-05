import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentCreateService from '../../../domain/port/driver/appointment/IAppointmentCreateService';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';

export default class AppointmentCreateService
  implements IAppointmentCreateService
{
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}
  create(appointment: IAppointmentClientData): Promise<string> {
    return this.cacUPBRepository.saveAppointment(appointment);
  }
}
