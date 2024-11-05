import Ticket from '../../../model/ticket/Ticket';

export default interface ITicketRecuperatorService {
  recuperatorTicketAll(): Promise<Ticket[]>;
  recuperatorTicketById(turn: string): Promise<Ticket>;
}
