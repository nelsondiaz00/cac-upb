import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import AppointmentView from '../appointment/view/AppointmentView';
import TicketView from '../ticket/view/TicketView';
import EmployeeView from '../employee/view/EmployeeView';
import ClientView from '../client-component/view/ClientView';
import ClientAppointmentPublicView from '../client/client-appointment/view/ClientAppointmentPublicView';
import ClientTicketPublicView from '../client/client-ticket/view/ClientTicketPublicView';
import ClientEmployeePublicView from '../client/client-employee/view/ClientEmployeePublicView';

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly appointmentView: AppointmentView,
    private readonly ticketView: TicketView,
    private readonly employeeView: EmployeeView,
    private readonly clientView: ClientView,
    private readonly clientAppointmentPublicView: ClientAppointmentPublicView,
    private readonly clientTicketPublicView: ClientTicketPublicView,
    private readonly clientEmployeePublicView: ClientEmployeePublicView
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
    this.app.use(
      '/appointment',
      express.static(
        path.resolve(__dirname, '../client/client-appointment/public')
      )
    );
    this.app.use(
      '/ticket',
      express.static(path.resolve(__dirname, '../client/client-ticket/public'))
    );
    this.app.use(
      '/employee',
      express.static(
        path.resolve(__dirname, '../client/client-employee/public')
      )
    );
  };

  public routes = (): void => {
    this.app.use(
      '/api/v1.0/cac/appointments',
      cors(),
      this.appointmentView.router
    );
    this.app.use('/api/v1.0/cac/tickets', cors(), this.ticketView.router);
    this.app.use('/api/v1.0/cac/employees', cors(), this.employeeView.router);
    this.app.use('/api/v1.0/cac/clients', cors(), this.clientView.router);
    this.app.use(
      '/appointment',
      cors(),
      this.clientAppointmentPublicView.router
    );
    this.app.use('/ticket', cors(), this.clientTicketPublicView.router);
    this.app.use('/employee', cors(), this.clientEmployeePublicView.router);

    // this.app.use('/', cors(), this.clientAppointmentPublicView.router);
    //this.app.use('*', cors(), this.clientAppointmentPublicView.router);
  };

  public start = (): void => {
    const PORT = process.env['PORT'] ?? 3000;
    const HOST = process.env['HOST'] ?? 'localhost';
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  };
}
