export default interface IAppointmentClientRetriverService {
  retrieveAppointmentClientByIdentification(
    identification: string
  ): Promise<string>;
}
