import AppointmentMasterDetailController from './controller/Appointments-controller.js';
import AppointmentMasterDetailModel from './model/Appointments-model.js';
import AppointmentMasterDetailView from './view/Appointments-view.js';

export default class AppointmentMasterDetail {
  public static create(): AppointmentMasterDetailController {
    const model = new AppointmentMasterDetailModel();
    const view = new AppointmentMasterDetailView(model);
    const controller = new AppointmentMasterDetailController(model, view);
    return controller;
  }
}
