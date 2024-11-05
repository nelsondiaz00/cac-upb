import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ITicketDeactivateService from '../../../domain/port/driver/ticket/ITicketDeactivateService';
import TicketDeactivateService from '../../../application/service/TicketServices/TicketDeactivateService';

export default class TicketDeactivateServiceFactory {
  public static readonly create = (): ITicketDeactivateService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new TicketDeactivateService(CacUPBRepository);
  };
}
