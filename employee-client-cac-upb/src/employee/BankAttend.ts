import BankAttendController from './controller/BankAttendController.js';
import BankAttendModel from './model/BankAttendModel.js';
import BankAttendView from './view/BankAttendView.js';

export default class BankAttend {
  public static create(): BankAttendController {
    const model = new BankAttendModel();
    const view = new BankAttendView(model);
    const controller = new BankAttendController(model, view);
    return controller;
  }
}
