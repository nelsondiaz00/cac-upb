import AppointmentController from './controller/AppointmentController.js';
import AppointmentModel from './model/AppointmentModel.js';
import AppointmentView from './view/AppointmentView.js';
export default class Appointment {
    static create() {
        const model = new AppointmentModel();
        const view = new AppointmentView(model);
        const controller = new AppointmentController(model, view);
        return controller;
    }
}
