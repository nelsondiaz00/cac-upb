import Ticket from '../../../domain/model/ticket/Ticket';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import ITicketDeactivateService from '../../../domain/port/driver/ticket/ITicketDeactivateService';
import ITicketQueueRecuperatorService from '../../../domain/port/driver/ticket/ITicketQueueRecuperatorService';
import ClientPriorityQueue from '../../../infrastructure/repository/database/provider/ClientPriorityQueue';

export default class TicketQueueRecuperatorService
  implements ITicketQueueRecuperatorService
{
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly appointmentRecuperatorService: IAppointmentRecuperatorService,
    private readonly ticketDeactivatorService: ITicketDeactivateService
  ) {}

  async retrieveTicketQueue(): Promise<Ticket[]> {
    const DBTicketsQueue = await this.cacUPBRepository.findTicketsQueue();
    for (const ticket of DBTicketsQueue) {
      ClientPriorityQueue.enqueue(
        new Ticket(
          ticket.turn,
          await this.appointmentRecuperatorService.recuperatorById(
            ticket.appointment_id
          )
        )
      );
    }
    return ClientPriorityQueue.getAllTickets();
  }
  async retrievePeekTicketQueue(): Promise<Ticket> {
    await this.retrieveTicketQueue();
    return ClientPriorityQueue.peek();
  }
  async nextTicketQueue(): Promise<boolean> {
    await this.retrieveTicketQueue();
    const ticketDequeued = ClientPriorityQueue.dequeue();
    if (ticketDequeued.isNull()) return Promise.resolve(false);
    return this.ticketDeactivatorService.deactivateTicket(
      ticketDequeued.getTurn()
    );
  }
}
