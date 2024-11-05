import Ticket from '../../../model/ticket/Ticket';

export default interface ITicketQueueRecuperatorService {
  retrieveTicketQueue(): Promise<Ticket[]>;
  retrievePeekTicketQueue(): Promise<Ticket>;
  nextTicketQueue(): Promise<boolean>;
}
