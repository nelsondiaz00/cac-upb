import IEmployeeData from '../../../types/IEmployeeData';

export default interface IEmployeeCreatorService {
  createEmployee(employeeData: IEmployeeData): Promise<boolean>;
}
