import RouterExpress from '../../../../express/domain/RouterExpress';
import AppointmentClientUseCase from '../../../application/usecase/ClientUseCase';
import AppointmentClientRetriverServiceFactory from '../../factory/AppointmentClientRetriverFactory';
import AppointmentClientControllerExpress from './controller/ClientControllerExpress';
import AppointmentClientRouterExpress from './router/ClientRouterExpress';

export default class ViewClientRouter {
  public static readonly create = (): RouterExpress => {
    const appointmentRetriverService =
      AppointmentClientRetriverServiceFactory.create();

    const appointmentClientUseCase = new AppointmentClientUseCase(
      appointmentRetriverService
    );

    // TODO: validate use case
    const appointmentController = new AppointmentClientControllerExpress(
      appointmentClientUseCase
    );
    // TODO: validate controller
    return new AppointmentClientRouterExpress(appointmentController);
  };
}
