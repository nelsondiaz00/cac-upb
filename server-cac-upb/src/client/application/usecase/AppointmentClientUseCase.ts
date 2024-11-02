import IAppointmentClientRetriverService from '../../domain/port/driver/appointment-client/IAppointmentClientRetriverService';
import IAppointmentClientUseCase from '../../domain/port/driver/appointment-client/IAppointmentClientUseCase';

export default class AppointmentClientUseCase
  implements IAppointmentClientUseCase
{
  constructor(
    private readonly appointmentCreateService: IAppointmentClientRetriverService
  ) {
    this.appointmentCreateService = appointmentCreateService;
  }
  async obtainAppointmentClient(module: string): Promise<string> {
    return await this.appointmentCreateService.retrieveAppointmentClientByIdentification(
      module
    );
  }
}
