import { Request, Response } from 'express';

export default interface IClientControllerExpress {
  readAppointments(req: Request, res: Response): void;
  readAppointmentById(req: Request, res: Response): void;
  createAppointment(req: Request, res: Response): void;
  updateAppointment(req: Request, res: Response): void;
  deleteAppointment(req: Request, res: Response): void;
  readAppointmentsDeleted(req: Request, res: Response): void;
}
