import UpdateAppointmentController from './controller/UpdateAppointmentController.js';
import UpdateAppointmentModel from './model/UpdateAppointmentModel.js';
import UpdateAppointmentView from './view/UpdateAppointmentView.js';

export default class UpdateAppointment {
  public static create(): UpdateAppointmentController {
    const model = new UpdateAppointmentModel();
    const view = new UpdateAppointmentView(model);
    const controller = new UpdateAppointmentController(model, view);
    return controller;
  }
}
