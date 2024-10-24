import ClientController from './controller/ClientPublicController';
import ClientView from './view/ClientPublicView';

export default class ClientPublic {
  public static readonly createView = (): ClientView => {
    const controller = new ClientController();
    return new ClientView(controller);
  };
}
