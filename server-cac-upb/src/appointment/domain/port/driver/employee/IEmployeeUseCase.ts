import Employee from '../../../model/employee/Employee';
import IEmployeeData from '../../../types/IEmployeeData';

export default interface IEmployeeUseCase {
  createEmployee(employeeData: IEmployeeData): Promise<boolean>;
  readEmployees(): Promise<Employee[]>;
  readEmployeeByEmail(email: string): Promise<Employee>;
}
