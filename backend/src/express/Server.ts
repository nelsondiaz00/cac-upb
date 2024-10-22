import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import AppointmentView from '../appointment/view/AppointmentView';
import TicketView from '../ticket/view/TicketView';
import EmployeeView from '../employee/view/EmployeeView';
import ClientView from '../client-component/view/ClientView';

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly appointmentView: AppointmentView,
    private readonly ticketView: TicketView,
    private readonly employeeView: EmployeeView,
    private readonly clientView: ClientView
  ) {
    this.app = express();
    this.statics();
    this.config();
    this.routes();
  }

  public config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  public statics = (): void => {
    this.app.use(express.static(path.resolve(__dirname, '../client/public')));
  };

  public routes = (): void => {
    this.app.use('/api/v1.0/cac', cors(), this.appointmentView.router);
    this.app.use('/api/v1.0/cac', cors(), this.ticketView.router);
    this.app.use('/api/v1.0/cac', cors(), this.employeeView.router);
    this.app.use('/api/v1.0/cac', cors(), this.clientView.router);
    // this.app.use('/', cors(), this.clientView.router);
    // this.app.use('*', cors(), this.clientView.router);
  };

  public start = (): void => {
    const PORT = process.env['PORT'] ?? 3000;
    const HOST = process.env['HOST'] ?? 'localhost';
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  };
}
