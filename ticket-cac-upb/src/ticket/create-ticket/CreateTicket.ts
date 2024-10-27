import CreateTicketController from './controller/CreateTicketController.js';
import CreateTicketModel from './model/CreateTicketModel.js';
import CreateTicketView from './view/CreateTicketView.js';

export default class CreateTicket {
  public static create(): CreateTicketController {
    const model = new CreateTicketModel();
    const view = new CreateTicketView(model);
    const controller = new CreateTicketController(model, view);
    return controller;
  }
}
