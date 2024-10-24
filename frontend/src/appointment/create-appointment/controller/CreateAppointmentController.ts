import CreateAppointmentModel from '../model/CreateAppointmentModel.js';
import CreateAppointmentView from '../view/CreateAppointmentView.js';

export default class CreateAppointmentController {
  private model: CreateAppointmentModel;
  private view: CreateAppointmentView;

  constructor(model: CreateAppointmentModel, view: CreateAppointmentView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
