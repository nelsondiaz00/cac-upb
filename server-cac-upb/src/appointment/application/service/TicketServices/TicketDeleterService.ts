import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import ITicketDeleterService from '../../../domain/port/driver/ticket/ITicketDeleterService';

export default class TicketDeleteService implements ITicketDeleterService {
  constructor(private readonly cacUPBRepository: ICacUPBRepository) {}
  deleteTicket(turn: string): Promise<boolean> {
    return this.cacUPBRepository.deleteTicketById(turn);
  }
}
