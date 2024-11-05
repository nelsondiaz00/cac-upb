import RouterExpress from '../../../../express/domain/RouterExpress';
import ClientUseCase from '../../../application/usecase/ClientUseCase';
import ClientRetriverServiceFactory from '../../factory/ClientRetriverFactory';
import AppointmentClientControllerExpress from './controller/ClientControllerExpress';
import AppointmentClientRouterExpress from './router/ClientRouterExpress';

export default class ViewClientRouter {
  public static readonly create = (): RouterExpress => {
    const appointmentRetriverService = ClientRetriverServiceFactory.create();

    const appointmentClientUseCase = new ClientUseCase(
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
