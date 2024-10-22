import { Router } from 'express';
import ClientController from '../controller/ClientController';

export default class TicketView {
  router: Router;

  constructor(private readonly clientController: ClientController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/client/:id',
      this.clientController.getClientById.bind(this.clientController)
    );

    this.router.get(
      '/client',
      this.clientController.getClients.bind(this.clientController)
    );
  };
}
