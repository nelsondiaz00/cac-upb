export default interface ITicketDeactivateService {
  deactivateTicket(appointmentId: string): Promise<boolean>;
}
