export default interface IClientRetriverService {
  retrieveAppointmentClientByModule(identification: string): Promise<string>;
  retrieveTicketClientByModule(identification: string): Promise<string>;
  retrieveEmployeeClientByModule(identification: string): Promise<string>;
}
