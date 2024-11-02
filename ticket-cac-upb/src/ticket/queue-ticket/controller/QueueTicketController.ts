import QueueTicketModel from '../model/QueueTicketModel.js';
import QueueTicketView from '../view/QueueTicketView.js';

export default class QueueTicketController {
  private model: QueueTicketModel;
  private view: QueueTicketView;

  constructor(model: QueueTicketModel, view: QueueTicketView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
