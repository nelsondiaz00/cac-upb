import { Request, Response } from 'express';

export default interface IBankControllerExpress {
  readBankByTicket(req: Request, res: Response): void;
  readBankByEmployeeIdentificacion(req: Request, res: Response): void;
  updateTicket(req: Request, res: Response): void;
}
