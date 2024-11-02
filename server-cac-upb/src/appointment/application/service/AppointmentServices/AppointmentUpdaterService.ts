import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentUpdateService from '../../../domain/port/driver/appointment/IAppointmentUpdateService';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';

export default class AppointmentUpdateService
  implements IAppointmentUpdateService
{
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}

  update(appointmentClientData: IAppointmentClientData): Promise<boolean> {
    return this.cacUPBRepository.updateAppointment(appointmentClientData);
  }
}
