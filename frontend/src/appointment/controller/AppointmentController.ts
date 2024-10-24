import AppointmentModel from '../model/AppointmentModel.js';
import AppointmentView from '../view/AppointmentView.js';

export default class AppointmentController {
  private model: AppointmentModel;
  private view: AppointmentView;

  constructor(model: AppointmentModel, view: AppointmentView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
