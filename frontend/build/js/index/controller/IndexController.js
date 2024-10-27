import CreateAppointment from '../../appointment/create-appointment/CreateAppointment.js';
import UpdateAppointment from '../../appointment/update-appointment/UpdateAppointment.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    createAppointment;
    updateAppointment;
    // private readonly movies: MoviesController
    // private readonly error: ErrorController
    // private readonly contact: ContactController
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.createAppointment = CreateAppointment.create();
        this.updateAppointment = UpdateAppointment.create();
        // this.menu = Menu.create()
        // this.error = Error404.create()
        // this.contact = Contact.create()
    }
    init = async () => {
        this.indexModel.init();
        this.loadMain(this.indexView.getPageFromMeta());
    };
    loadMain = async (component) => {
        this.indexView.renderMain(component ?? 'error');
        switch (component) {
            case 'create':
                this.loadCreateAppointment();
                break;
            case 'update':
                this.loadUpdateAppointment();
                break;
            case 'default':
                console.log('Defaultt');
                break;
            default:
                console.log('Error');
            //this.loadError();
        }
    };
    loadCreateAppointment = async () => {
        this.createAppointment.init();
    };
    loadUpdateAppointment = async () => {
        this.updateAppointment.init();
    };
}
