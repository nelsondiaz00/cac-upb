import RouterExpress from '../../../../express/domain/RouterExpress';
import EmployeeUseCase from '../../../application/usecase/EmployeeUseCase';
import EmployeeCreatorServiceFactory from '../../factory/employee/EmployeeCreatorServiceFactory';
import EmployeeRecuperatorServiceFactory from '../../factory/employee/EmployeeRecuperatorServiceFactory';
import EmployeeControllerExpress from './controller/EmployeeControllerExpress';
import EmployeeRouterExpress from './router/EmployeeRouterExpress';

export default class EmployeeRouter {
  public static readonly create = (): RouterExpress => {
    const employeeRecuperatorService =
      EmployeeRecuperatorServiceFactory.create();
    const employeeCreatorService = EmployeeCreatorServiceFactory.create();
    // TODO: validate service
    const employeeUseCase = new EmployeeUseCase(
      employeeCreatorService,
      employeeRecuperatorService
    );
    // TODO: validate use case
    const employeeController = new EmployeeControllerExpress(employeeUseCase);
    // TODO: validate controller
    return new EmployeeRouterExpress(employeeController);
  };
}
