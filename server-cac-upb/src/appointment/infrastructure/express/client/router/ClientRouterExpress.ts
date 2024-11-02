import RouterExpress from '../../../../../express/domain/RouterExpress';
import IClientControllerExpress from '../../../../domain/port/driver/client/IClientControllerExpress';

export default class ClientRouterExpress
  extends RouterExpress
  implements ClientRouterExpress
{
  constructor(private readonly clientController: IClientControllerExpress) {
    super();
    this.routes();
  }

  public routes = (): void => {
    this.getClientById();
  };

  public getClientById = (): void => {
    this.router.get(
      '/clients/client/:id',
      this.clientController.readClientByIdentification.bind(
        this.clientController
      )
    );
  };
}
