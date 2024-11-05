import Employee from '../../domain/model/employee/Employee';
import IEmployeeCreatorService from '../../domain/port/driver/employee/IEmployeeCreatorService';
import IEmployeeRecuperatorService from '../../domain/port/driver/employee/IEmployeeRecuperatorService';
import IEmployeeUseCase from '../../domain/port/driver/employee/IEmployeeUseCase';
import IEmployeeData from '../../domain/types/IEmployeeData';


export default class EmployeeUseCase implements IEmployeeUseCase {
  constructor(
    private readonly employeeCreatorService: IEmployeeCreatorService,
    private readonly employeeRecuperatorService: IEmployeeRecuperatorService
  ) {}
  createEmployee(employeeData: IEmployeeData): Promise<boolean> {
    return this.employeeCreatorService.createEmployee(employeeData);
  }
  readEmployees(): Promise<Employee[]> {
    return this.employeeRecuperatorService.retrieveAllEmployees();
  }
  readEmployeeByEmail(email: string): Promise<Employee> {
    return this.employeeRecuperatorService.retrieveEmployeeByEmail(email);
  }
}
