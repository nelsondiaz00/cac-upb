import ShowCancelAppointmentController from './controller/ShowCancelAppointmentController.js';
import ShowCancelAppointmentModel from './model/ShowCancelAppointmentModel.js';
import ShowCancelAppointmentView from './view/ShowCancelAppointmentView.js';

export default class ShowCancelAppointment {
  public static create(): ShowCancelAppointmentController {
    const model = new ShowCancelAppointmentModel();
    const view = new ShowCancelAppointmentView(model);
    const controller = new ShowCancelAppointmentController(model, view);
    return controller;
  }
}
