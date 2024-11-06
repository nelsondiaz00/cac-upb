import AppointmentMasterDetailModel from '../model/Appointments-model.js';
import AppointmentMasterDetailView from '../view/Appointments-view.js';

export default class AppointmentMasterDetailController {
  private model: AppointmentMasterDetailModel;
  private view: AppointmentMasterDetailView;

  constructor(
    model: AppointmentMasterDetailModel,
    view: AppointmentMasterDetailView
  ) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
