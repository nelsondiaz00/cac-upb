import { Request, Response } from 'express';

export default interface IEmployeeClientControllerExpress {
  index(req: Request, res: Response): void;
}
