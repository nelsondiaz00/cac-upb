import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IAppointmentDeletedRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentDeletedRecuperatorService';
import AppointmentDeletedRecuperatorService from '../../../application/service/AppointmentServices/AppointmentDeletedRecuperatorService';
import ClientRecuperatorServiceFactory from '../client/ClientRecuperatorServiceFactory';

export default class AppointmentDeletedRecuperatorServiceFactory {
  public static readonly create = (): IAppointmentDeletedRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const clientRecuperatorService = ClientRecuperatorServiceFactory.create();
    return new AppointmentDeletedRecuperatorService(
      CacUPBRepository,
      clientRecuperatorService
    );
  };
}
