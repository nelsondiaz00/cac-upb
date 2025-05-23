import CreateTicketController from '../../ticket/create-ticket/controller/CreateTicketController.js';
import CreateTicket from '../../ticket/create-ticket/CreateTicket.js';
import QueueTicketController from '../../ticket/queue-ticket/controller/QueueTicketController.js';
import QueueTicket from '../../ticket/queue-ticket/QueueTicket.js';
import IndexModel from '../model/IndexModel.js';
import IndexView from '../view/IndexView.js';
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  private readonly createTicket: CreateTicketController;
  private readonly queueTicket: QueueTicketController;
  // private readonly movies: MoviesController
  // private readonly error: ErrorController
  // private readonly contact: ContactController

  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.createTicket = CreateTicket.create();
    this.queueTicket = QueueTicket.create();
    // this.menu = Menu.create()
    // this.error = Error404.create()
    // this.contact = Contact.create()
  }

  public init = async (): Promise<void> => {
    this.indexModel.init();
    // console.log('wtf');
    this.loadMain(this.indexView.getPageFromMeta());
  };

  public loadMain = async (component: string): Promise<void> => {
    this.indexView.renderMain(component ?? 'error');
    // console.log('xd');
    switch (component) {
      case 'create':
        this.loadCreateTicket();
        break;
      case 'queue':
        this.loadQueueTicket();
        break;
      default:
        console.log('Error');
      //this.loadError();
    }
  };

  public loadCreateTicket = async (): Promise<void> => {
    this.createTicket.init();
  };

  public loadQueueTicket = async (): Promise<void> => {
    this.queueTicket.init();
  };
}
