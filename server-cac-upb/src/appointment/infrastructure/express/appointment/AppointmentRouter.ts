import RouterExpress from '../../../../express/domain/RouterExpress';
import AppointmentUseCase from '../../../application/usecase/AppointmentUseCase';
import AppointmentCreatorServiceFactory from '../../factory/appointment/AppointmentCreatorServiceFactory';
import AppointmentDeletedRecuperatorServiceFactory from '../../factory/appointment/AppointmentDeleteRecuperatorServiceFactory';
import AppointmentDeleterServiceFactory from '../../factory/appointment/AppointmentDeleterServiceFactory';
import AppointmentRecuperatorServiceFactory from '../../factory/appointment/AppointmentRecuperatorServiceFactory';
import AppointmentUpdaterServiceFactory from '../../factory/appointment/AppointmentUpdaterServiceFactory';
import AppointmentControllerExpress from './controller/AppointmentControllerExpress';
import AppointmentRouterExpress from './router/AppointmentRouterExpress';

export default class AppointmentRouter {
  public static readonly create = (): RouterExpress => {
    const appointmentRecuperatorService =
      AppointmentRecuperatorServiceFactory.create();

    const appointmentCreatorService = AppointmentCreatorServiceFactory.create();
    const appointmentUpdaterService = AppointmentUpdaterServiceFactory.create();
    const appointmentDeleterService = AppointmentDeleterServiceFactory.create();
    const appointmentDeletedService =
      AppointmentDeletedRecuperatorServiceFactory.create();

    const appointmentUseCase = new AppointmentUseCase(
      appointmentRecuperatorService,
      appointmentCreatorService,
      appointmentUpdaterService,
      appointmentDeleterService,
      appointmentDeletedService
    );

    // TODO: validate use case
    const appointmentController = new AppointmentControllerExpress(
      appointmentUseCase
    );
    // TODO: validate controller
    return new AppointmentRouterExpress(appointmentController);
  };
}
