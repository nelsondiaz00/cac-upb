import ShowAppointment from '../../employee/show-appointment/ShowAppointment.js';
import ShowCancelAppointment from '../../employee/show-cancel-appointment/ShowCancelAppointment.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    showAppointment;
    showAppointmentCanceled;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.showAppointment = ShowAppointment.create();
        this.showAppointmentCanceled = ShowCancelAppointment.create();
    }
    init = async () => {
        this.indexModel.init();
        this.loadMain(this.indexView.getPageFromMeta());
    };
    loadMain = async (component) => {
        this.indexView.renderMain(component ?? 'error');
        console.log('xd');
        switch (component) {
            case 'appointments':
                this.loadAppointments();
                // console.log('create');
                break;
            case 'appointments-canceled':
                this.loadAppointmentsCanceled();
                break;
            default:
                console.log('Error');
        }
    };
    loadAppointments = async () => {
        this.showAppointment.init();
    };
    loadAppointmentsCanceled = async () => {
        this.showAppointmentCanceled.init();
    };
}
