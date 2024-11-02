import AppointmentRecuperatorService from '../../../application/service/AppointmentServices/AppointmentRecuperatorService';
import ClientUseCase from '../../../application/usecase/ClientUseCase';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ClientRecuperatorServiceFactory from '../client/ClientRecuperatorServiceFactory';

export default class AppointmentRecuperatorServiceFactory {
  public static readonly create = (): IAppointmentRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const clientRecuperatorService = ClientRecuperatorServiceFactory.create();
    const clientUseCase = new ClientUseCase(clientRecuperatorService);
    return new AppointmentRecuperatorService(CacUPBRepository, clientUseCase);
  };
}
