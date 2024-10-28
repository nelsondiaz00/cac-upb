import mysql from 'mysql2/promise';
import Employee from '../types/Employee';

export default class EmployeeModel {
  private connection!: mysql.Connection;

  constructor() {
    this.connectToDB();
  }
  private async connectToDB(): Promise<void> {
    const HOST = process.env['HOST'] ?? 'localhost';
    const USER_DB = process.env['USER_DB'] ?? 'root';
    const PASSWORD_DB = process.env['PASSWORD_DB'] ?? '1234';
    const DB_NAME = process.env['DB_NAME'] ?? 'CacUPBDB';

    this.connection = await mysql.createConnection({
      host: HOST,
      user: USER_DB,
      password: PASSWORD_DB,
      database: DB_NAME,
    });
  }

  public async getEmployees(): Promise<any> {
    const [rows]: any = await this.connection.execute('SELECT * FROM Employee');
    return rows;
  }

  public async getEmployeeById(id: string): Promise<any> {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Employee WHERE email = ?',
      [id]
    );
    return rows[0];
  }

  public async createEmployee(employee: Employee): Promise<void> {
    await this.connection.execute(
      'INSERT INTO Employee (identification, name, lastname, birthday, address, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        employee.getIdentification(),
        employee.getName(),
        employee.getLastname(),
        employee.getBirthday(),
        employee.getAddress(),
        employee.getEmail(),
        employee.getPassword(),
        employee.getRole(),
      ]
    );
  }
}
