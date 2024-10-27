import ClientController from './controller/ClientTicketPublicController';
import ClientView from './view/ClientTicketPublicView';

export default class ClientTicketPublic {
  public static readonly createView = (): ClientView => {
    const controller = new ClientController();
    return new ClientView(controller);
  };
}
