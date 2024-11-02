import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IAppointmentUpdateService from '../../../domain/port/driver/appointment/IAppointmentUpdateService';
import AppointmentUpdateService from '../../../application/service/AppointmentServices/AppointmentUpdaterService';

export default class AppointmentUpdaterServiceFactory {
  public static readonly create = (): IAppointmentUpdateService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new AppointmentUpdateService(CacUPBRepository);
  };
}
