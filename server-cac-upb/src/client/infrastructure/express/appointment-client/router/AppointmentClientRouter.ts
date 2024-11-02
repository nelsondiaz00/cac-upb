import RouterExpress from '../../../../../express/domain/RouterExpress';
import IAppointmentClientControllerExpress from '../../../../domain/port/driver/appointment-client/IAppointmentClientControllerExpress';
import IAppointmentClientRouterExpress from '../../../../domain/port/driver/appointment-client/IAppointmentClientRouterExpress';

export default class AppointmentClientRouterExpress
  extends RouterExpress
  implements IAppointmentClientRouterExpress
{
  constructor(
    private readonly appointmentClientController: IAppointmentClientControllerExpress
  ) {
    super();
    this.routes();
  }

  public routes = (): void => {
    this.getModule();
  };

  getModule(): void {
    this.router.get(
      '/appointment/:module',
      this.appointmentClientController.index.bind(
        this.appointmentClientController
      )
    );
  }
}
