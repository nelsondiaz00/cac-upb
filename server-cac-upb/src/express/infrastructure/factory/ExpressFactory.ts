import AppointmentRouter from '../../../appointment/infrastructure/express/appointment/AppointmentRouter';
import BankRouter from '../../../appointment/infrastructure/express/bank/BankRouter';
import ClientRouter from '../../../appointment/infrastructure/express/client/ClientRouter';
import EmployeeRouter from '../../../appointment/infrastructure/express/employee/EmployeeRouter';
import TicketRouter from '../../../appointment/infrastructure/express/ticket/TicketRouter';
import ViewClientRouter from '../../../client/infrastructure/express/client/AppointmentRouter';

import Server from '../server/Server';

export default class ExpressFactory {
  public static readonly create = (): Server => {
    const clientRouter = ClientRouter.create();
    const appointmentRouter = AppointmentRouter.create();
    const ticketRouter = TicketRouter.create();
    const employeeClient = EmployeeRouter.create();
    const clientViewRouter = ViewClientRouter.create();
    const bankRouter = BankRouter.create();
    const server = new Server([
      clientRouter,
      appointmentRouter,
      ticketRouter,
      employeeClient,
      bankRouter,
      clientViewRouter,
    ]);
    // TODO: validate server
    return server;
  };
}
