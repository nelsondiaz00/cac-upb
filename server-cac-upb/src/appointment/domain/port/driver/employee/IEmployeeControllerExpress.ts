import { Request, Response } from 'express';

export default interface IEmployeeControllerExpress {
  readEmployees(req: Request, res: Response): void;
  readEmployeesByEmail(req: Request, res: Response): void;
  createEmployee(req: Request, res: Response): void;
}
