import { Router } from 'express';
import TicketController from '../controller/TicketController';

export default class TicketView {
  router: Router;

  constructor(private readonly ticketController: TicketController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/ticket/:id',
      this.ticketController.getTicketById.bind(this.ticketController)
    );

    this.router.get(
      '/ticket',
      this.ticketController.getTicket.bind(this.ticketController)
    );

    // this.router.patch(
    //   '/appointment/update',
    //   this.appointmentController.updateAppointment.bind(
    //     this.appointmentController
    //   )
    // );

    this.router.post(
      '/ticket/create/:appointmentId',
      this.ticketController.createTicket.bind(this.ticketController)
    );

    this.router.delete(
      '/ticket/delete/:id',
      this.ticketController.deleteTicket.bind(this.ticketController)
    );

    // this.router.delete(
    //   '/appointment/delete/:id',
    //   this.appointmentController.deleteAppointment.bind(
    //     this.appointmentController
    //   )
    // );
  };
}
