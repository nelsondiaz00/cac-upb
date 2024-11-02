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
      '/',
      this.ticketController.getTickets.bind(this.ticketController)
    );

    this.router.post(
      '/ticket/create/:appointmentId',
      this.ticketController.createTicket.bind(this.ticketController)
    );

    this.router.delete(
      '/ticket/delete/:id',
      this.ticketController.deleteTicket.bind(this.ticketController)
    );

    this.router.patch(
      '/ticket/deactivate/:id',
      this.ticketController.deactivateTicket.bind(this.ticketController)
    );

    this.router.get(
      '/queue',
      this.ticketController.getQueue.bind(this.ticketController)
    );

    this.router.patch(
      '/queue/next',
      this.ticketController.nextTicket.bind(this.ticketController)
    );

    this.router.get(
      '/queue/peek',
      this.ticketController.peekQueue.bind(this.ticketController)
    );
  };
}
