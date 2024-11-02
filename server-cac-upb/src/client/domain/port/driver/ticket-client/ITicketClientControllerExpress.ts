import { Request, Response } from 'express';

export default interface ITicketClientControllerExpress {
  index(req: Request, res: Response): void;
}
