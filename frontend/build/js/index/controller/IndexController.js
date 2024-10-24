import Appointment from '../../appointment/Appointment.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    appointment;
    // private readonly movies: MoviesController
    // private readonly error: ErrorController
    // private readonly contact: ContactController
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.appointment = Appointment.create();
        // this.menu = Menu.create()
        // this.error = Error404.create()
        // this.contact = Contact.create()
    }
    init = async () => {
        this.indexModel.init();
        this.loadMain(this.indexView.getPageFromMeta());
        //  this.loadMain(this.indexView.getPageFromMeta())
    };
    loadMain = async (component) => {
        this.indexView.renderMain(component ?? 'error');
        switch (component) {
            case 'appointment':
                this.loadAppointment();
                break;
                break;
            default:
                console.log('Error');
            //this.loadError();
        }
    };
    loadAppointment = async () => {
        this.appointment.init();
    };
}
