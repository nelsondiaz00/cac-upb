export default interface IAppointmentClientUseCase {
  obtainAppointmentClient(module: string): Promise<string>;
}
