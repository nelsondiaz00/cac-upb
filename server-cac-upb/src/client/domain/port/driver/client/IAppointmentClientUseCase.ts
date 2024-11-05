export default interface IClientUseCase {
  obtainAppointmentClient(module: string): Promise<string>;
  obtainTicketClient(module: string): Promise<string>;
  obtainEmployeeClient(module: string): Promise<string>;
}
