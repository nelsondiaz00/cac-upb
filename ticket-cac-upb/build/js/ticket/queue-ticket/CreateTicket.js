import CreateTicketController from './controller/CreateTicketController.js';
import CreateTicketModel from './model/CreateTicketModel.js';
import CreateTicketView from './view/CreateTicketView.js';
export default class CreateTicket {
    static create() {
        const model = new CreateTicketModel();
        const view = new CreateTicketView(model);
        const controller = new CreateTicketController(model, view);
        return controller;
    }
}
