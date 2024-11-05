import Ticket from '../../../model/ticket/Ticket';

export default interface ITicketCreatorService {
  createTicket(appointmentId: string): Promise<Ticket>;
}
