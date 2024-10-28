import CreateEmployee from '../../employee/create-employee/CreateEmployee.js';
import Login from '../../employee/login-employee/login.js';
import ShowAppointment from '../../employee/show-appointment/ShowAppointment.js';
import ShowCancelAppointment from '../../employee/show-cancel-appointment/ShowCancelAppointment.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    showAppointment;
    showAppointmentCanceled;
    createEmployee;
    login;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.showAppointment = ShowAppointment.create();
        this.showAppointmentCanceled = ShowCancelAppointment.create();
        this.createEmployee = CreateEmployee.create();
        this.login = Login.create();
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
            case 'create':
                this.loadCreateEmployee();
                break;
            case 'login':
                this.loadLogin();
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
    loadCreateEmployee = async () => {
        this.createEmployee.init();
    };
    loadLogin = async () => {
        this.login.init();
    };
}
