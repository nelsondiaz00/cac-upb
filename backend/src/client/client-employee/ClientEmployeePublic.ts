import ClientController from './controller/ClientEmployeePublicController';
import ClientView from './view/ClientEmployeePublicView';

export default class ClientEmployeePublic {
  public static readonly createView = (): ClientView => {
    const controller = new ClientController();
    return new ClientView(controller);
  };
}
