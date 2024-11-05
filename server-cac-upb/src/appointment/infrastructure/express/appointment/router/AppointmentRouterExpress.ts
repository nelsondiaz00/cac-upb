import RouterExpress from '../../../../../express/domain/RouterExpress';
import IAppointmentControllerExpress from '../../../../domain/port/driver/appointment/IAppointmentControllerExpress';
import IAppointmentRouterExpress from '../../../../domain/port/driver/appointment/IAppointmentRouterExpress';

export default class AppointmentRouterExpress
  extends RouterExpress
  implements IAppointmentRouterExpress
{
  constructor(
    private readonly appointmentController: IAppointmentControllerExpress
  ) {
    super();
    this.routes();
  }

  public routes = (): void => {
    this.getAppointments();
    this.getAppointmentById();
    this.addAppointment();
    this.updateAppointment();
    this.deleteAppointment();
    this.getAppointmentsDeleted();
  };
  addAppointment(): void {
    this.router.post(
      '/appointments/appointment/create',
      this.appointmentController.createAppointment.bind(
        this.appointmentController
      )
    );
  }
  updateAppointment(): void {
    this.router.patch(
      '/appointments/appointment/update',
      this.appointmentController.updateAppointment.bind(
        this.appointmentController
      )
    );
  }
  deleteAppointment(): void {
    this.router.delete(
      '/appointments/appointment/delete/:id',
      this.appointmentController.deleteAppointment.bind(
        this.appointmentController
      )
    );
  }
  getAppointmentsDeleted(): void {
    this.router.get(
      '/appointments/appointments-deleted',
      this.appointmentController.readAppointmentsDeleted.bind(
        this.appointmentController
      )
    );
  }

  getAppointmentById(): void {
    this.router.get(
      '/appointments/appointment/:id',
      this.appointmentController.readAppointmentById.bind(
        this.appointmentController
      )
    );
  }

  public getAppointments = (): void => {
    this.router.get(
      '/appointments',
      this.appointmentController.readAppointments.bind(
        this.appointmentController
      )
    );
  };
}
