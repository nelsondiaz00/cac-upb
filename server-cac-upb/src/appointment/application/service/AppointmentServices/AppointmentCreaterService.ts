import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentCreateService from '../../../domain/port/driver/appointment/IAppointmentCreateService';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';
import AddressAppointmentProvider from '../../../infrastructure/repository/database/provider/AddressProvider';
import DateAppointmentProvider from '../../../infrastructure/repository/database/provider/DateAppointmentProvider';
import TypeAppointmentProvider from '../../../infrastructure/repository/database/provider/TypeAppointmentProvider';

export default class AppointmentCreateService
  implements IAppointmentCreateService
{
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}
  create(appointment: IAppointmentClientData): Promise<string> {
    const typeAppointment = TypeAppointmentProvider.get(appointment.type);
    const addressAppointment = AddressAppointmentProvider.get(
      appointment.address
    );
    if (typeAppointment === 'error' || addressAppointment === 'error')
      return Promise.resolve('error');
    console.log(appointment.date);
    return this.cacUPBRepository.saveAppointment({
      client_identification: appointment.client_identification,
      type: typeAppointment,
      date: DateAppointmentProvider.get(appointment.date),
      address: addressAppointment,
      description: appointment.description,
      notes: appointment.notes,
    });
  }
}
