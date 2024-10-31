import BankAttendModel from '../model/BankAttendModel.js';
import BankAttendView from '../view/BankAttendView.js';

export default class BankAttendController {
  private model: BankAttendModel;
  private view: BankAttendView;

  constructor(model: BankAttendModel, view: BankAttendView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
