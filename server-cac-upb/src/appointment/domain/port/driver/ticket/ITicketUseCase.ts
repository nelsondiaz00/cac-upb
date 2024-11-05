import Ticket from '../../../model/ticket/Ticket';

export default interface ITicketUseCase {
  getTickets(): Promise<Ticket[]>;
  getTicketById(idTicket: string): Promise<Ticket>;
  createTicket(idAppointment: string): Promise<Ticket>;
  deactivateTicket(idTicket: string): Promise<boolean>;
  deleteTicket(idTicket: string): Promise<boolean>;
  getQueueTickets(): Promise<Ticket[]>;
  nextQueue(): Promise<boolean>;
  peekQueue(): Promise<Ticket>;
}
