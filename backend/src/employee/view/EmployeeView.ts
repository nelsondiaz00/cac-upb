import { Router } from 'express';
import EmployeeController from '../controller/EmployeeController';

export default class EmployeeView {
  router: Router;

  constructor(private readonly employeeController: EmployeeController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/employee',
      this.employeeController.getEmployees.bind(this.employeeController)
    );

    this.router.get(
      '/employee/:id',
      this.employeeController.getEmployeesById.bind(this.employeeController)
    );
    this.router.post(
      '/employee/create',
      this.employeeController.createEmployee.bind(this.employeeController)
    );
  };
}
