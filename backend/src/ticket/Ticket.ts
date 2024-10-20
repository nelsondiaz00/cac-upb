import TicketController from './controller/TicketController';
import TicketModel from './model/TicketModel';
import TicketView from './view/TicketView';

export default class Movies {
  public static readonly createView = (): TicketView => {
    const model = new TicketModel();
    const controller = new TicketController(model);
    return new TicketView(controller);
  };
}
