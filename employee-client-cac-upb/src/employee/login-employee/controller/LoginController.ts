import LoginModel from '../model/LoginModel.js';
import LoginView from '../view/LoginView.js';

export default class LoginController {
  private model: LoginModel;
  private view: LoginView;

  constructor(model: LoginModel, view: LoginView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
