import CreateEmployeeModel from '../model/CreateEmployeeModel.js';
import CreateEmployeeView from '../view/CreateEmployeeView.js';

export default class CreateEmployeeController {
  private model: CreateEmployeeModel;
  private view: CreateEmployeeView;

  constructor(model: CreateEmployeeModel, view: CreateEmployeeView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
