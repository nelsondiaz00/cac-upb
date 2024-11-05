import RouterExpress from '../../../../express/domain/RouterExpress';
import BankUseCase from '../../../application/usecase/BankUseCase';
import BankRecuperatorServiceFactory from '../../factory/bank/BankRecuperatorServiceFactory';
import BankUpdaterServiceFactory from '../../factory/bank/BankUpdaterServiceFactory';
import BankControllerExpress from './controller/BankControllerExpress';
import BankRouterExpress from './router/BankRouterExpress';

export default class BankRouter {
  public static readonly create = (): RouterExpress => {
    const BankRecuperatorService = BankRecuperatorServiceFactory.create();
    const bankUpdaterService = BankUpdaterServiceFactory.create();

    const bankUseCase = new BankUseCase(
      BankRecuperatorService,
      bankUpdaterService
    );

    // TODO: validate use case
    const bankController = new BankControllerExpress(bankUseCase);
    // TODO: validate controller
    return new BankRouterExpress(bankController);
  };
}
