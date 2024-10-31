import BankAttendController from './controller/BankAttendController.js';
import BankAttendModel from './model/BankAttendModel.js';
import BankAttendView from './view/BankAttendView.js';
export default class BankAttend {
    static create() {
        const model = new BankAttendModel();
        const view = new BankAttendView(model);
        const controller = new BankAttendController(model, view);
        return controller;
    }
}
