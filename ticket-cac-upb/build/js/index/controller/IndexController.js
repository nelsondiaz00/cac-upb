import CreateTicket from '../../ticket/create-ticket/CreateTicket.js';
import QueueTicket from '../../ticket/queue-ticket/QueueTicket.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    createTicket;
    queueTicket;
    // private readonly movies: MoviesController
    // private readonly error: ErrorController
    // private readonly contact: ContactController
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.createTicket = CreateTicket.create();
        this.queueTicket = QueueTicket.create();
        // this.menu = Menu.create()
        // this.error = Error404.create()
        // this.contact = Contact.create()
    }
    init = async () => {
        this.indexModel.init();
        // console.log('wtf');
        this.loadMain(this.indexView.getPageFromMeta());
    };
    loadMain = async (component) => {
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
    loadCreateTicket = async () => {
        this.createTicket.init();
    };
    loadQueueTicket = async () => {
        this.queueTicket.init();
    };
}
