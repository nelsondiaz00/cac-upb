import EmployeeController from './controller/EmployeeController';
import EmployeeModel from './model/EmployeeModel';
import EmployeeView from './view/EmployeeView';

export default class Movies {
  public static readonly createView = (): EmployeeView => {
    const model = new EmployeeModel();
    const controller = new EmployeeController(model);
    return new EmployeeView(controller);
  };
}
