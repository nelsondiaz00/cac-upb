import { Request, Response } from 'express';
import IClientUseCase from '../../../../domain/port/driver/client/IAppointmentClientUseCase';
import IClientControllerExpress from '../../../../domain/port/driver/client/IClientControllerExpress';
export default class ClientControllerExpress
  implements IClientControllerExpress
{
  constructor(private readonly clientUseCase: IClientUseCase) {}

  async indexAppointmentModule(req: Request, res: Response): Promise<void> {
    await this.handleClientRequest(
      req,
      res,
      this.clientUseCase.obtainAppointmentClient.bind(this.clientUseCase),
      'Error al obtener el cliente de la cita'
    );
  }

  async indexTicketModule(req: Request, res: Response): Promise<void> {
    await this.handleClientRequest(
      req,
      res,
      this.clientUseCase.obtainTicketClient.bind(this.clientUseCase),
      'Error al obtener el cliente del ticket'
    );
  }

  async indexEmployeeModule(req: Request, res: Response): Promise<void> {
    await this.handleClientRequest(
      req,
      res,
      this.clientUseCase.obtainEmployeeClient.bind(this.clientUseCase),
      'Error al obtener el cliente del empleado'
    );
  }
  private async handleClientRequest(
    req: Request,
    res: Response,
    useCase: Function,
    errorMessage: string
  ): Promise<void> {
    const { module } = req.params;
    if (!module) {
      res.status(400).json({ message: 'Info err' });
      return;
    }
    try {
      const client = await useCase(module);
      client
        ? res.status(200).send(client)
        : res.status(400).json({ message: 'Client not found' });
    } catch (error) {
      console.error(errorMessage, error);
      res.status(500).json({ error: errorMessage });
    }
  }
}
