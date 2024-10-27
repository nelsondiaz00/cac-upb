import ShowAppointmentController from './controller/ShowAppointmentController.js';
import ShowAppointmentModel from './model/ShowAppointmentModel.js';
import ShowAppointmentView from './view/ShowAppointmentView.js';
export default class ShowAppointment {
    static create() {
        const model = new ShowAppointmentModel();
        const view = new ShowAppointmentView(model);
        const controller = new ShowAppointmentController(model, view);
        return controller;
    }
}
