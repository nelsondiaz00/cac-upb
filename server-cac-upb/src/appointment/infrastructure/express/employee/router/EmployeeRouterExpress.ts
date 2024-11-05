import RouterExpress from '../../../../../express/domain/RouterExpress';
import IEmployeeControllerExpress from '../../../../domain/port/driver/employee/IEmployeeControllerExpress';
import IEmployeeRouterExpress from '../../../../domain/port/driver/employee/IEmployeeRouterExpress';

export default class EmployeeRouterExpress
  extends RouterExpress
  implements IEmployeeRouterExpress
{
  constructor(private readonly employeeController: IEmployeeControllerExpress) {
    super();
    this.routes();
  }
  public routes = (): void => {
    this.getEmployees();
    this.getEmployeeByEmail();
    this.createEmployee();
  };

  getEmployees(): void {
    this.router.get(
      '/employees',
      this.employeeController.readEmployees.bind(this.employeeController)
    );
  }
  getEmployeeByEmail(): void {
    this.router.get(
      '/employees/employee/:email',
      this.employeeController.readEmployeesByEmail.bind(this.employeeController)
    );
  }
  createEmployee(): void {
    this.router.post(
      '/employees/employee/create',
      this.employeeController.createEmployee.bind(this.employeeController)
    );
  }
}
