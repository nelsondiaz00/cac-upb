import UpdateAppointmentModel from '../model/UpdateAppointmentModel.js';
import UpdateAppointmentView from '../view/UpdateAppointmentView.js';

export default class CreateAppointmentController {
  private model: UpdateAppointmentModel;
  private view: UpdateAppointmentView;

  constructor(model: UpdateAppointmentModel, view: UpdateAppointmentView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
