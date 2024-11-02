import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IAppointmentDeletedRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentDeletedRecuperatorService';
import AppointmentDeletedRecuperatorService from '../../../application/service/AppointmentServices/AppointmentDeletedRecuperatorService';
import ClientRecuperatorServiceFactory from '../client/ClientRecuperatorServiceFactory';
import ClientUseCase from '../../../application/usecase/ClientUseCase';

export default class AppointmentDeletedRecuperatorServiceFactory {
  public static readonly create = (): IAppointmentDeletedRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const clientRecuperatorService = ClientRecuperatorServiceFactory.create();
    const clientUseCase = new ClientUseCase(clientRecuperatorService);
    return new AppointmentDeletedRecuperatorService(
      CacUPBRepository,
      clientUseCase
    );
  };
}
