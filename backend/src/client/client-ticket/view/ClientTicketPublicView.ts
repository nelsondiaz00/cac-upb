import { Router } from 'express';
import ClientController from '../controller/ClientTicketPublicController';

export default class ClientTicketPublicView {
  router: Router;

  constructor(private readonly clientController: ClientController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/',
      this.clientController.index.bind(this.clientController)
    );

    this.router.get(
      '/:module',
      this.clientController.index.bind(this.clientController)
    );
  };
}
