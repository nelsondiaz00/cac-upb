import Ticket from '../../domain/model/ticket/Ticket';
import ITicketCreatorService from '../../domain/port/driver/ticket/ITicketCreatorService';
import ITicketDeactivateService from '../../domain/port/driver/ticket/ITicketDeactivateService';
import ITicketDeleterService from '../../domain/port/driver/ticket/ITicketDeleterService';
import ITicketQueueRecuperatorService from '../../domain/port/driver/ticket/ITicketQueueRecuperatorService';
import ITicketRecuperatorService from '../../domain/port/driver/ticket/ITicketRecuperatorService';
import ITicketUseCase from '../../domain/port/driver/ticket/ITicketUseCase';

export default class TicketUseCase implements ITicketUseCase {
  constructor(
    private readonly ticketCreatorService: ITicketCreatorService,
    private readonly ticketDeactivateService: ITicketDeactivateService,
    private readonly ticketDeleterService: ITicketDeleterService,
    private readonly ticketRecuperatorService: ITicketRecuperatorService,
    private readonly ticketQueueRecuperatorService: ITicketQueueRecuperatorService
  ) {}
  getTickets(): Promise<Ticket[]> {
    return this.ticketRecuperatorService.recuperatorTicketAll();
  }
  getTicketById(idTicket: string): Promise<Ticket> {
    return this.ticketRecuperatorService.recuperatorTicketById(idTicket);
  }
  createTicket(idAppointment: string): Promise<Ticket> {
    return this.ticketCreatorService.createTicket(idAppointment);
  }
  deactivateTicket(idTicket: string): Promise<boolean> {
    return this.ticketDeactivateService.deactivateTicket(idTicket);
  }
  deleteTicket(idTicket: string): Promise<boolean> {
    return this.ticketDeleterService.deleteTicket(idTicket);
  }
  getQueueTickets(): Promise<Ticket[]> {
    return this.ticketQueueRecuperatorService.retrieveTicketQueue();
  }
  nextQueue(): Promise<boolean> {
    return this.ticketQueueRecuperatorService.nextTicketQueue();
  }
  peekQueue(): Promise<Ticket> {
    return this.ticketQueueRecuperatorService.retrievePeekTicketQueue();
  }
}
