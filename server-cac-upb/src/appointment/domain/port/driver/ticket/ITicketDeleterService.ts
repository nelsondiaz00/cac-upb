export default interface ITicketDeleterService {
  deleteTicket(ticketId: string): Promise<boolean>;
}
