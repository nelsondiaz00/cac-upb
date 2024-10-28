import CreateEmployeeController from './controller/CreateEmployeeController.js';
import CreateEmployeeModel from './model/CreateEmployeeModel.js';
import CreateEmployeeView from './view/CreateEmployeeView.js';

export default class CreateEmployee {
  public static create(): CreateEmployeeController {
    const model = new CreateEmployeeModel();
    const view = new CreateEmployeeView(model);
    const controller = new CreateEmployeeController(model, view);
    return controller;
  }
}
