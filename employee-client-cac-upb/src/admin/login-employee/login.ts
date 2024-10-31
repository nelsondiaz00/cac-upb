import LoginController from './controller/LoginController.js';
import LoginModel from './model/LoginModel.js';
import LoginView from './view/LoginView.js';

export default class Login {
  public static create(): LoginController {
    const model = new LoginModel();
    const view = new LoginView(model);
    const controller = new LoginController(model, view);
    return controller;
  }
}
