import AppointmentRouter from '../../../appointment/infrastructure/express/appointment/AppointmentRouter';
import ClientRouter from '../../../appointment/infrastructure/express/client/ClientRouter';
import ViewClientRouter from '../../../client/infrastructure/express/client/AppointmentRouter';

import Server from '../server/Server';

export default class ExpressFactory {
  public static readonly create = (): Server => {
    const clientRouter = ClientRouter.create();
    const appointmentRouter = AppointmentRouter.create();
    // const appointmentClient = AppointmentClientRouter.create();
    const client = ViewClientRouter.create();
    const server = new Server([clientRouter, appointmentRouter, client]);
    // TODO: validate server
    return server;
  };
}
