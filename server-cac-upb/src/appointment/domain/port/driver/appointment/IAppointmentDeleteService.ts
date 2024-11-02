export default interface IAppointmentDeleteService {
  delete(id: string): Promise<boolean>;
}
