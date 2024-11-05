import RouterExpress from '../../../../../express/domain/RouterExpress';
import ITicketControllerExpress from '../../../../domain/port/driver/ticket/ITicketControllerExpress';
import ITicketRouterExpress from '../../../../domain/port/driver/ticket/ITicketRouterExpress';

export default class TicketRouterExpress
  extends RouterExpress
  implements ITicketRouterExpress
{
  constructor(
    private readonly ticketControllerExpress: ITicketControllerExpress
  ) {
    super();
    this.routes();
  }

  public routes = (): void => {
    this.getTicketById();
    this.getTickets();
    this.addTicket();
    this.deleteTicket();
    this.deactivateTicket();
    this.getQueueTickets();
    this.getNextQueueTickets();
    this.getPeekQueueTickets();
  };

  getTicketById(): void {
    this.router.get(
      '/tickets/ticket/:id',
      this.ticketControllerExpress.readTicketById.bind(
        this.ticketControllerExpress
      )
    );
  }
  getTickets = (): void => {
    this.router.get(
      '/tickets',
      this.ticketControllerExpress.readTickets.bind(
        this.ticketControllerExpress
      )
    );
  };
  addTicket(): void {
    this.router.post(
      '/tickets/ticket/create/:id',
      this.ticketControllerExpress.createTicket.bind(
        this.ticketControllerExpress
      )
    );
  }
  deactivateTicket(): void {
    this.router.patch(
      '/tickets/ticket/deactivate/:id',
      this.ticketControllerExpress.deactivateTicket.bind(
        this.ticketControllerExpress
      )
    );
  }
  deleteTicket(): void {
    this.router.delete(
      '/tickets/ticket/delete/:id',
      this.ticketControllerExpress.deleteTicket.bind(
        this.ticketControllerExpress
      )
    );
  }
  getQueueTickets(): void {
    this.router.get(
      '/tickets/queue',
      this.ticketControllerExpress.readQueue.bind(this.ticketControllerExpress)
    );
  }
  getPeekQueueTickets(): void {
    this.router.get(
      '/tickets/queue/peek',
      this.ticketControllerExpress.peekQueue.bind(this.ticketControllerExpress)
    );
  }
  getNextQueueTickets(): void {
    this.router.patch(
      '/tickets/queue/next',
      this.ticketControllerExpress.nextPositionQueue.bind(
        this.ticketControllerExpress
      )
    );
  }
}
