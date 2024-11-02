import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentDeleteService from '../../../domain/port/driver/appointment/IAppointmentDeleteService';

export default class AppointmentDeleteService
  implements IAppointmentDeleteService
{
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}

  delete(id: string): Promise<boolean> {
    return this.cacUPBRepository.deleteAppointmentById(id);
  }
}
