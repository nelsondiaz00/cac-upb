import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ITicketDeleterService from '../../../domain/port/driver/ticket/ITicketDeleterService';
import TicketDeleterService from '../../../application/service/TicketServices/TicketDeleterService';

export default class TicketDeleterServiceFactory {
  public static readonly create = (): ITicketDeleterService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    return new TicketDeleterService(CacUPBRepository);
  };
}
