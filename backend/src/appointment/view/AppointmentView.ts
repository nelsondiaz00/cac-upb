import { Router } from 'express';
import AppointmentController from '../controller/AppointmentController';

export default class AppointmentView {
  router: Router;

  constructor(private readonly appointmentController: AppointmentController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/appointment/:id',
      this.appointmentController.getAppointmentById.bind(
        this.appointmentController
      )
    );

    this.router.get(
      '/',
      this.appointmentController.getAppointments.bind(
        this.appointmentController
      )
    );

    this.router.get(
      '/appointments-deleted',
      this.appointmentController.getAppointmentsDeleted.bind(
        this.appointmentController
      )
    );

    this.router.patch(
      '/appointment/update',
      this.appointmentController.updateAppointment.bind(
        this.appointmentController
      )
    );

    this.router.post(
      '/appointment/create',
      this.appointmentController.createAppointment.bind(
        this.appointmentController
      )
    );

    this.router.delete(
      '/appointment/delete/:id',
      this.appointmentController.deleteAppointment.bind(
        this.appointmentController
      )
    );
  };
}
