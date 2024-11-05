import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IEmployeeRecuperatorService from '../../../domain/port/driver/employee/IEmployeeRecuperatorService';
import EmployeeRecuperatorService from '../../../application/service/EmployeeServices/EmployeeRecuperatorService';

export default class EmployeeRecuperatorServiceFactory {
  public static readonly create = (): IEmployeeRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new EmployeeRecuperatorService(CacUPBRepository);
  };
}
