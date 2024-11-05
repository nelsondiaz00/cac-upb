import NullTicket from '../../../domain/model/ticket/NullTicket';
import Ticket from '../../../domain/model/ticket/Ticket';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import ITicketRecuperatorService from '../../../domain/port/driver/ticket/ITicketRecuperatorService';
import ITicketData from '../../../domain/types/ITicketData';

export default class TicketRecuperatorService
  implements ITicketRecuperatorService
{
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly appointmentRecuperatorService: IAppointmentRecuperatorService
  ) {}
  async recuperatorTicketById(turn: string): Promise<Ticket> {
    const DBTicket = await this.cacUPBRepository.findTicketById(turn);
    if (DBTicket.id === '' || DBTicket === undefined) return new NullTicket();
    return new Ticket(
      DBTicket.turn,
      await this.appointmentRecuperatorService.recuperatorById(
        DBTicket.appointment_id
      )
    );
  }
  public async recuperatorTicketAll(): Promise<Ticket[]> {
    const DBTickets = await this.cacUPBRepository.findAllTickets();
    const Tickets = DBTickets.map(async (ticket: ITicketData) => {
      return new Ticket(
        ticket.turn,
        await this.appointmentRecuperatorService.recuperatorById(
          ticket.appointment_id
        )
      );
    });
    return Promise.all(Tickets);
  }
}
