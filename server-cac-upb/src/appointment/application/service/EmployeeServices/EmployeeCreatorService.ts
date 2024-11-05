import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IEmployeeCreatorService from '../../../domain/port/driver/employee/IEmployeeCreatorService';
import IEmployeeData from '../../../domain/types/IEmployeeData';
import BirthdayProvider from '../../../infrastructure/repository/database/provider/BirthdayProvider';

export default class EmployeeCreatorService implements IEmployeeCreatorService {
  constructor(private readonly CacUPBRepository: ICacUPBRepository) {}
  async createEmployee(employeeData: IEmployeeData): Promise<boolean> {
    employeeData.birthday = BirthdayProvider.get(employeeData.birthday);
    return await this.CacUPBRepository.saveEmployee(employeeData);
  }
}
