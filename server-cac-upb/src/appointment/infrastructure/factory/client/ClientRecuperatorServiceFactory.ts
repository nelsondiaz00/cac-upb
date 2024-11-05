import ClientRecuperatorService from '../../../application/service/ClientServices/ClientRecuperatorService';
import IClientRecuperatorService from '../../../domain/port/driver/client/IClientRecuperatorService';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';

export default class ClientRecuperatorServiceFactory {
  public static readonly create = (): IClientRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();

    return new ClientRecuperatorService(CacUPBRepository);
  };
}
