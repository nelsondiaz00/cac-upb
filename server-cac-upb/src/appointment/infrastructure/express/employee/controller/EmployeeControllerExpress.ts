import { Request, Response } from 'express';
import IEmployeeControllerExpress from '../../../../domain/port/driver/employee/IEmployeeControllerExpress';
import IEmployeeUseCase from '../../../../domain/port/driver/employee/IEmployeeUseCase';
import NullEmployee from '../../../../domain/model/employee/NullEmployee';

export default class EmployeeControllerExpress
  implements IEmployeeControllerExpress
{
  constructor(private readonly employeeUseCase: IEmployeeUseCase) {}
  async readEmployees(_req: Request, res: Response): Promise<void> {
    try {
      const employee = await this.employeeUseCase.readEmployees();
      res.status(200).json(employee);
    } catch (e) {
      res.status(500).json([new NullEmployee()]);
      console.error(e);
    }
  }
  async readEmployeesByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json(new NullEmployee());
        return;
      }
      const employee = await this.employeeUseCase.readEmployeeByEmail(email);
      res.status(200).json(employee);
    } catch (e) {
      res.status(500).json(new NullEmployee());
      console.error(e);
    }
  }
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = req.body;
      if (!employee) {
        res.status(400).json({ message: 'Employee data wrong' });
        return;
      }
      const result = await this.employeeUseCase.createEmployee(employee);
      if (!result) {
        res.status(400).json({ message: 'Employee not created' });
        return;
      }
      res.status(200).json({ message: 'Employee created' });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Employee not created for internal server error' });
      console.error(e);
    }
  }
}
