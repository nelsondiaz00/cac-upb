export default interface ITicketRouterExpress {
  getTickets(): void;
  getTicketById(): void;
  addTicket(): void;
  deleteTicket(): void;
  deactivateTicket(): void;
  getQueueTickets(): void;
  getNextQueueTickets(): void;
  getPeekQueueTickets(): void;
}
