import { Router } from 'express';
import ClientController from '../controller/ClientEmployeePublicController';

export default class ClientEmployeePublicView {
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
