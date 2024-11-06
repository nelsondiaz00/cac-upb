import Employee from '../../../domain/model/employee/Employee';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IEmployeeRecuperatorService from '../../../domain/port/driver/employee/IEmployeeRecuperatorService';
import RoleEmployeeProvider from '../../../infrastructure/repository/database/provider/RoleEmployeeProvider';
import { getDate } from '../../../util/dates';

export default class EmployeeRecuperatorService
  implements IEmployeeRecuperatorService
{
  constructor(private readonly CacUPBRepository: ICacUPBRepository) {}
  async retrieveEmployeeById(id: string): Promise<Employee> {
    const employee = await this.CacUPBRepository.findEmployeeById(id);
    return new Employee(
      employee.identification,
      employee.name,
      employee.lastname,
      getDate(employee.birthday),
      employee.address,
      employee.email,
      employee.password,
      RoleEmployeeProvider.get(employee.role)
    );
  }
  async retrieveEmployeeByIdentification(id: string): Promise<Employee> {
    const employee = await this.CacUPBRepository.findEmployeeByIdentification(
      id
    );
    return new Employee(
      employee.identification,
      employee.name,
      employee.lastname,
      getDate(employee.birthday),
      employee.address,
      employee.email,
      employee.password,
      RoleEmployeeProvider.get(employee.role)
    );
  }

  async retrieveAllEmployees(): Promise<Employee[]> {
    const employeeBD = await this.CacUPBRepository.findEmployees();
    const employees = employeeBD.map((employee) => {
      return new Employee(
        employee.identification,
        employee.name,
        employee.lastname,
        getDate(employee.birthday),
        employee.address,
        employee.email,
        employee.password,
        RoleEmployeeProvider.get(employee.role)
      );
    });
    return employees;
  }
  async retrieveEmployeeByEmail(email: string): Promise<Employee> {
    const employee = await this.CacUPBRepository.findEmployeeByEmail(email);
    return new Employee(
      employee.identification,
      employee.name,
      employee.lastname,
      getDate(employee.birthday),
      employee.address,
      employee.email,
      employee.password,
      RoleEmployeeProvider.get(employee.role)
    );
  }
}
