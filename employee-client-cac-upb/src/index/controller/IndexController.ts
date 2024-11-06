// import CreateTicketController from '../../ticket/create-ticket/controller/CreateTicketController.js';
// import CreateTicket from '../../ticket/create-ticket/CreateTicket.js';
import AppointmentMasterDetail from '../../admin/appointments-master-detail/AppointmentsMasterDetail.js';
import AppointmentMasterDetailController from '../../admin/appointments-master-detail/controller/Appointments-controller.js';
import CreateEmployeeController from '../../admin/create-employee/controller/CreateEmployeeController.js';
import CreateEmployee from '../../admin/create-employee/CreateEmployee.js';
import LoginController from '../../admin/login-employee/controller/LoginController.js';
import Login from '../../admin/login-employee/login.js';
// import ShowAppointmentController from '../../admin/show-appointment/controller/ShowAppointmentController.js';
// import ShowAppointment from '../../admin/show-appointment/ShowAppointment.js';
import ShowCancelAppointmentController from '../../admin/show-cancel-appointment/controller/ShowCancelAppointmentController.js';
import ShowCancelAppointment from '../../admin/show-cancel-appointment/ShowCancelAppointment.js';
import BankAttend from '../../employee/BankAttend.js';
import BankAttendController from '../../employee/controller/BankAttendController.js';
import IndexModel from '../model/IndexModel.js';
import IndexView from '../view/IndexView.js';
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  // private readonly showAppointment: ShowAppointmentController;
  private readonly showAppointmentCanceled: ShowCancelAppointmentController;
  private readonly createEmployee: CreateEmployeeController;
  private readonly bankAttend: BankAttendController;
  private readonly login: LoginController;
  private readonly appointmentMasterDetail: AppointmentMasterDetailController;
  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    // this.showAppointment = ShowAppointment.create();
    this.showAppointmentCanceled = ShowCancelAppointment.create();
    this.createEmployee = CreateEmployee.create();
    this.login = Login.create();
    this.bankAttend = BankAttend.create();
    this.appointmentMasterDetail = AppointmentMasterDetail.create();
  }

  public init = async (): Promise<void> => {
    this.indexModel.init();
    this.loadMain(this.indexView.getPageFromMeta());
  };

  public loadMain = async (component: string): Promise<void> => {
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

  public loadAppointments = async (): Promise<void> => {
    // this.showAppointment.init();
    this.appointmentMasterDetail.init();
  };

  public loadAppointmentsCanceled = async (): Promise<void> => {
    this.showAppointmentCanceled.init();
  };

  public loadCreateEmployee = async (): Promise<void> => {
    this.createEmployee.init();
  };

  public loadLogin = async (): Promise<void> => {
    this.login.init();
  };

  public loadBankAttend = async (): Promise<void> => {
    this.bankAttend.init();
  };
}
