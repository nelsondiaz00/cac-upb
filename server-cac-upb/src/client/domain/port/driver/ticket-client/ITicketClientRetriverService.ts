export default interface ITicketClientRetriverService {
  retrieveTicketClientByIdentification(identification: string): Promise<string>;
}
