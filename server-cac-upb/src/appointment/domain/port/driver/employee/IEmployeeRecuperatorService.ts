import Employee from '../../../model/employee/Employee';

export default interface IEmployeeRecuperatorService {
  retrieveAllEmployees(): Promise<Employee[]>;
  retrieveEmployeeByEmail(email: string): Promise<Employee>;
  retrieveEmployeeById(id: string): Promise<Employee>;
}
