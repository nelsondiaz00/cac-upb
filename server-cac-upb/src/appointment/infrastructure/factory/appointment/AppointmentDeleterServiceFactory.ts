import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IAppointmentDeleteService from '../../../domain/port/driver/appointment/IAppointmentDeleteService';
import AppointmentDeleteService from '../../../application/service/AppointmentServices/AppointmentDeleterService';

export default class AppointmentDeleterServiceFactory {
  public static readonly create = (): IAppointmentDeleteService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new AppointmentDeleteService(CacUPBRepository);
  };
}
