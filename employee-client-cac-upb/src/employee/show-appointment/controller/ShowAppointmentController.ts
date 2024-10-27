import ShowAppointmentModel from '../model/ShowAppointmentModel.js';
import ShowAppointmentView from '../view/ShowAppointmentView.js';

export default class ShowAppointmentController {
  private model: ShowAppointmentModel;
  private view: ShowAppointmentView;

  constructor(model: ShowAppointmentModel, view: ShowAppointmentView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
