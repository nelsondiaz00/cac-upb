import CreateTicketModel from '../model/CreateTicketModel.js';
import CreateTicketView from '../view/CreateTicketView.js';

export default class CreateTicketController {
  private model: CreateTicketModel;
  private view: CreateTicketView;

  constructor(model: CreateTicketModel, view: CreateTicketView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
