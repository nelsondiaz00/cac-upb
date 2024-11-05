import IClientRetriverService from '../../domain/port/driver/client/IAppointmentClientRetriverService';
import IClientUseCase from '../../domain/port/driver/client/IAppointmentClientUseCase';

export default class ClientUseCase implements IClientUseCase {
  constructor(
    private readonly appointmentCreateService: IClientRetriverService
  ) {
    this.appointmentCreateService = appointmentCreateService;
  }
  async obtainTicketClient(module: string): Promise<string> {
    return await this.appointmentCreateService.retrieveTicketClientByModule(
      module
    );
  }
  async obtainEmployeeClient(module: string): Promise<string> {
    return await this.appointmentCreateService.retrieveEmployeeClientByModule(
      module
    );
  }
  async obtainAppointmentClient(module: string): Promise<string> {
    return await this.appointmentCreateService.retrieveAppointmentClientByModule(
      module
    );
  }
}
