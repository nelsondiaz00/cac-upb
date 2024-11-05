import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import ITicketDeactivateService from '../../../domain/port/driver/ticket/ITicketDeactivateService';

export default class TicketDeactivateService
  implements ITicketDeactivateService
{
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}
  deactivateTicket(turn: string): Promise<boolean> {
    return this.cacUPBRepository.deactiveTicket(turn);
  }
}
