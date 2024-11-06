// import CreateTicketController from '../../ticket/create-ticket/controller/CreateTicketController.js';
// import CreateTicket from '../../ticket/create-ticket/CreateTicket.js';
import AppointmentMasterDetail from '../../admin/appointments-master-detail/AppointmentsMasterDetail.js';
import CreateEmployee from '../../admin/create-employee/CreateEmployee.js';
import Login from '../../admin/login-employee/login.js';
import ShowCancelAppointment from '../../admin/show-cancel-appointment/ShowCancelAppointment.js';
import BankAttend from '../../employee/BankAttend.js';
// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    indexView;
    // private readonly showAppointment: ShowAppointmentController;
    showAppointmentCanceled;
    createEmployee;
    bankAttend;
    login;
    appointmentMasterDetail;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        // this.showAppointment = ShowAppointment.create();
        this.showAppointmentCanceled = ShowCancelAppointment.create();
        this.createEmployee = CreateEmployee.create();
        this.login = Login.create();
        this.bankAttend = BankAttend.create();
        this.appointmentMasterDetail = AppointmentMasterDetail.create();
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
            case 'bank-attend':
                this.loadBankAttend();
                break;
            default:
                console.log('Error');
        }
    };
    loadAppointments = async () => {
        // this.showAppointment.init();
        this.appointmentMasterDetail.init();
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
    loadBankAttend = async () => {
        this.bankAttend.init();
    };
}
