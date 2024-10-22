import ClientController from './controller/ClientController';
import ClientModel from './model/ClientModel';
import ClientView from './view/ClientView';

export default class Movies {
  public static readonly createView = (): ClientView => {
    const model = new ClientModel();
    const controller = new ClientController(model);
    return new ClientView(controller);
  };
}
