import { Request, Response } from 'express';
import IAppointmentClientControllerExpress from '../../../../domain/port/driver/appointment-client/IAppointmentClientControllerExpress';
import IAppointmentClientUseCase from '../../../../domain/port/driver/appointment-client/IAppointmentClientUseCase';

export default class AppointmentClientControllerExpress
  implements IAppointmentClientControllerExpress
{
  constructor(private readonly clientUseCase: IAppointmentClientUseCase) {}
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { module } = req.params;
      if (module === undefined) {
        res.status(400).json({ message: 'Info err' });
        return;
      }
      const client = await this.clientUseCase.obtainAppointmentClient(module);

      if (client) {
        res.status(200).send(client);
      } else {
        res.status(400).json({ message: 'Client not found' });
      }
    } catch (error) {
      console.error('Error al obtener el cliente de la cita:', error);
      res
        .status(500)
        .json({ error: 'No se pudo obtener el cliente de la cita' });
    }
  }
}
