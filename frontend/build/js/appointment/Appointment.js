import CreateAppointmentController from './controller/AppointmentController.js';
import CreateAppointmentModel from './model/AppointmentModel.js';
import CreateAppointmentView from './view/AppointmentView.js';
export default class Appointment {
    static create() {
        const model = new CreateAppointmentModel();
        const view = new CreateAppointmentView(model);
        const controller = new CreateAppointmentController(model, view);
        return controller;
    }
}
