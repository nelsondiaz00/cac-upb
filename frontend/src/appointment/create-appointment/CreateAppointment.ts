import CreateAppointmentController from './controller/CreateAppointmentController.js';
import CreateAppointmentModel from './model/CreateAppointmentModel.js';
import CreateAppointmentView from './view/CreateAppointmentView.js';

export default class CreateAppointment {
  public static create(): CreateAppointmentController {
    const model = new CreateAppointmentModel();
    const view = new CreateAppointmentView(model);
    const controller = new CreateAppointmentController(model, view);
    return controller;
  }
}
