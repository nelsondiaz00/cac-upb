import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import IEmployeeCreatorService from '../../../domain/port/driver/employee/IEmployeeCreatorService';
import EmployeeCreatorService from '../../../application/service/EmployeeServices/EmployeeCreatorService';

export default class EmployeeCreatorServiceFactory {
  public static readonly create = (): IEmployeeCreatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new EmployeeCreatorService(CacUPBRepository);
  };
}
