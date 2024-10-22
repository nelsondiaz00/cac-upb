import { Request, Response } from 'express';
import EmployeeModel from '../model/EmployeeModel';
import Employee from '../types/Employee';

export default class EmployeeController {
  constructor(private readonly employeeModel: EmployeeModel) {}

  public getEmployees = async (_req: Request, res: Response) => {
    const products = await this.employeeModel.getEmployees();
    if (products.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(products);
  };

  public getEmployeesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      const product = await this.employeeModel.getEmployeeById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Id is required' });
    }
  };

  public createEmployee = async (req: Request, res: Response) => {
    try {
      const {
        identification,
        name,
        lastname,
        birthday,
        address,
        email,
        password,
        role,
      } = req.body;

      if (
        Object.values(req.body).every(Boolean) &&
        (role === 'ADMIN' || role === 'EMPLOYEE')
      ) {
        const employee = new Employee(
          identification,
          name,
          lastname,
          new Date(birthday),
          address,
          email,
          password,
          role
        );
        await this.employeeModel.createEmployee(employee);
        res.status(201).json({ message: 'User created' });
      } else {
        const missingFields = !Object.values(req.body).every(Boolean)
          ? 'All user fields are required'
          : 'Role must be either ADMIN or EMPLOYEE';
        res.status(400).json({ message: missingFields });
      }
    } catch (error) {
      if ((error as any).code === 'ER_DUP_ENTRY') {
        res
          .status(409)
          .json({ message: 'User not created: Duplicate identification' });
      } else {
        const errorMessage = (error as Error).message;
        res
          .status(500)
          .json({ message: 'An error occurred', error: errorMessage });
      }
    }
  };
}
