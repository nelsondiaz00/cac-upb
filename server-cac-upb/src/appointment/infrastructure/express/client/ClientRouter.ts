import RouterExpress from '../../../../express/domain/RouterExpress';
import ClientUseCase from '../../../application/usecase/ClientUseCase';
import ClientRecuperatorServiceFactory from '../../factory/client/ClientRecuperatorServiceFactory';
import ClientControllerExpress from './controller/ClientControllerExpress';
import ClientRouterExpress from './router/ClientRouterExpress';

export default class ClientRouter {
  public static readonly create = (): RouterExpress => {
    const clientRecuperatorService = ClientRecuperatorServiceFactory.create();
    // TODO: validate service
    const clientUseCase = new ClientUseCase(clientRecuperatorService);
    // TODO: validate use case
    const clientController = new ClientControllerExpress(clientUseCase);
    // TODO: validate controller
    return new ClientRouterExpress(clientController);
  };
}
