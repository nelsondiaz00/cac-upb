import RouterExpress from '../../../../express/domain/RouterExpress';
import AppointmentClientUseCase from '../../../application/usecase/AppointmentClientUseCase';
import AppointmentClientRetriverServiceFactory from '../../factory/AppointmentClientRetriverFactory';
import AppointmentClientControllerExpress from './controller/AppointmentClientControllerExpress';
import AppointmentClientRouterExpress from './router/AppointmentClientRouter';

export default class AppointmentClientRouter {
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
