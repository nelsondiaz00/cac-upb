import QueueTicketController from './controller/QueueTicketController.js';
import QueueTicketModel from './model/QueueTicketModel.js';
import QueueTicketView from './view/QueueTicketView.js';
export default class QueueTicket {
    static create() {
        const model = new QueueTicketModel();
        const view = new QueueTicketView(model);
        const controller = new QueueTicketController(model, view);
        return controller;
    }
}
