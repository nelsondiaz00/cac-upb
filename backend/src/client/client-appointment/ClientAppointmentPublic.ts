import ClientController from './controller/ClientAppointmentPublicController';
import ClientView from './view/ClientAppointmentPublicView';

export default class ClientAppointmentPublic {
  public static readonly createView = (): ClientView => {
    const controller = new ClientController();
    return new ClientView(controller);
  };
}
