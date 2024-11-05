import RouterExpress from '../../../../../express/domain/RouterExpress';
import IClientControllerExpress from '../../../../domain/port/driver/client/IClientControllerExpress';
import IClientRouterExpress from '../../../../domain/port/driver/client/IClientRouterExpress';

export default class ClientRouterExpress
  extends RouterExpress
  implements IClientRouterExpress
{
  constructor(private readonly clientController: IClientControllerExpress) {
    super();
    this.routes();
  }
  public routes = (): void => {
    this.getAppointmentModule();
    this.getTicketModule();
    this.getEmployeeModule();
  };

  getAppointmentModule(): void {
    this.router.get(
      '/appointment/:module',
      this.clientController.indexAppointmentModule.bind(this.clientController)
    );
  }
  getTicketModule(): void {
    this.router.get(
      '/ticket/:module',
      this.clientController.indexTicketModule.bind(this.clientController)
    );
  }
  getEmployeeModule(): void {
    this.router.get(
      '/employee/:module',
      this.clientController.indexEmployeeModule.bind(this.clientController)
    );
  }
}
