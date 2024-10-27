import ShowCancelAppointmentModel from '../model/ShowCancelAppointmentModel.js';
import ShowCancelAppointmentView from '../view/ShowCancelAppointmentView.js';

export default class ShowCancelAppointmentController {
  private model: ShowCancelAppointmentModel;
  private view: ShowCancelAppointmentView;

  constructor(
    model: ShowCancelAppointmentModel,
    view: ShowCancelAppointmentView
  ) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
