import Ticket from '../../../domain/model/ticket/Ticket';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IAppointmentRecuperatorService from '../../../domain/port/driver/appointment/IAppointmentRecuperatorService';
import ITicketCreatorService from '../../../domain/port/driver/ticket/ITicketCreatorService';

export default class TicketCreatorService implements ITicketCreatorService {
  constructor(
    private readonly cacUPBRepository: ICacUPBRepository,
    private readonly appointmentRecuperatorService: IAppointmentRecuperatorService
  ) {}
  async createTicket(appointmentId: string): Promise<Ticket> {
    const ticketBD = await this.cacUPBRepository.saveTicket(appointmentId);
    const appointment =
      await this.appointmentRecuperatorService.recuperatorById(
        ticketBD.appointment_id
      );

    return new Ticket(ticketBD.turn, appointment);
  }
}
