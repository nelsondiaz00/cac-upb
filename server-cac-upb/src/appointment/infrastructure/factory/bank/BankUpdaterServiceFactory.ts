import BankUpdaterService from '../../../application/service/BankServices/BankUpdaterService';
import IBankUpdaterService from '../../../domain/port/driver/bank/IBankUpdaterService';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
export default class BankUpdaterServiceFactory {
  public static readonly create = (): IBankUpdaterService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new BankUpdaterService(CacUPBRepository);
  };
}
