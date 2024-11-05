import ClientRetriverService from '../../application/service/ClientRetriverService';
import IClientRetriverService from '../../domain/port/driver/client/IAppointmentClientRetriverService';

export default class ClientRetriverServiceFactory {
  public static readonly create = (): IClientRetriverService => {
    return new ClientRetriverService();
  };
}
