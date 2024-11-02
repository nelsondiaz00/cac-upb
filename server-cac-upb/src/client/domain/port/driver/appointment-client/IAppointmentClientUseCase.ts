export default interface IAppointmentClientUseCase {
  obtainAppointmentClient(module: string): Promise<string>;
  obtainTicketClient(module: string): Promise<string>;
  obtainEmployeeClient(module: string): Promise<string>;
}
