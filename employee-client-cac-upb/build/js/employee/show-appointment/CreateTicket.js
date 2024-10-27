import CreateTicketController from './controller/ShowAppointmentController.js';
import CreateTicketModel from './model/ShowAppointmentModel.js';
import CreateTicketView from './view/ShowAppointmentView.js';
export default class CreateTicket {
    static create() {
        const model = new CreateTicketModel();
        const view = new CreateTicketView(model);
        const controller = new CreateTicketController(model, view);
        return controller;
    }
}
