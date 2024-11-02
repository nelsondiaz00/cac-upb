import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IAppointmentCreateService from '../../../domain/port/driver/appointment/IAppointmentCreateService';
import AppointmentCreateService from '../../../application/service/AppointmentServices/AppointmentCreaterService';

export default class AppointmentCreatorServiceFactory {
  public static readonly create = (): IAppointmentCreateService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new AppointmentCreateService(CacUPBRepository);
  };
}
