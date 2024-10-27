// import CreateTicketController from '../../ticket/create-ticket/controller/CreateTicketController.js';
// import CreateTicket from '../../ticket/create-ticket/CreateTicket.js';
import ShowAppointmentController from '../../employee/show-appointment/controller/ShowAppointmentController.js';
import ShowAppointment from '../../employee/show-appointment/ShowAppointment.js';
import ShowCancelAppointmentController from '../../employee/show-cancel-appointment/controller/ShowCancelAppointmentController.js';
import ShowCancelAppointment from '../../employee/show-cancel-appointment/ShowCancelAppointment.js';
import IndexModel from '../model/IndexModel.js';
import IndexView from '../view/IndexView.js';
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  private readonly showAppointment: ShowAppointmentController;
  private readonly showAppointmentCanceled: ShowCancelAppointmentController;
  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.showAppointment = ShowAppointment.create();
    this.showAppointmentCanceled = ShowCancelAppointment.create();
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
      default:
        console.log('Error');
    }
  };

  public loadAppointments = async (): Promise<void> => {
    this.showAppointment.init();
  };

  public loadAppointmentsCanceled = async (): Promise<void> => {
    this.showAppointmentCanceled.init();
  };
}
