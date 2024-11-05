import BankRecuperatorService from '../../../application/service/BankServices/BankRecuperatorService';
import IBankRecuperatorService from '../../../domain/port/driver/bank/IBankRecuperatorService';
import EmployeeRecuperatorServiceFactory from '../employee/EmployeeRecuperatorServiceFactory';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import TicketRecuperatorServiceFactory from '../ticket/TicketRecuperatorServiceFactory';
export default class BankRecuperatorServiceFactory {
  public static readonly create = (): IBankRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const employeeRecuperatorService =
      EmployeeRecuperatorServiceFactory.create();
    const ticketRecuperatorService = TicketRecuperatorServiceFactory.create();
    return new BankRecuperatorService(
      CacUPBRepository,
      employeeRecuperatorService,
      ticketRecuperatorService
    );
  };
}
