import { Request, Response } from 'express';

export default interface IAppointmentClientControllerExpress {
  index(req: Request, res: Response): void;
}
