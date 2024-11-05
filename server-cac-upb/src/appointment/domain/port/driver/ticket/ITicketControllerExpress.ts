import { Request, Response } from 'express';

export default interface ITicketControllerExpress {
  readTickets(req: Request, res: Response): void;
  readTicketById(req: Request, res: Response): void;
  createTicket(req: Request, res: Response): void;
  deactivateTicket(req: Request, res: Response): void;
  deleteTicket(req: Request, res: Response): void;
  readQueue(req: Request, res: Response): void;
  nextPositionQueue(req: Request, res: Response): void;
  peekQueue(req: Request, res: Response): void;
}
