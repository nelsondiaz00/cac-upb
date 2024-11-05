import AppointmentRecuperatorService from '../../../application/service/AppointmentServices/AppointmentRecuperatorService';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ClientRecuperatorServiceFactory from '../client/ClientRecuperatorServiceFactory';

export default class AppointmentRecuperatorServiceFactory {
  public static readonly create = (): IAppointmentRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const clientRecuperatorService = ClientRecuperatorServiceFactory.create();
    return new AppointmentRecuperatorService(
      CacUPBRepository,
      clientRecuperatorService
    );
  };
}
