import { Request, Response } from 'express';

export default interface IClientControllerExpress {
  readClientByIdentification(req: Request, res: Response): void;
  readClientById(req: Request, res: Response): void;
}
