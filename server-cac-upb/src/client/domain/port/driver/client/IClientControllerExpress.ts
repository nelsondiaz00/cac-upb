import { Request, Response } from 'express';

export default interface IClientControllerExpress {
  indexAppointmentModule(req: Request, res: Response): void;
  indexTicketModule(req: Request, res: Response): void;
  indexEmployeeModule(req: Request, res: Response): void;
}
