import Appointment from '../../appointment/Appointment.js';
import AppointmentController from '../../appointment/controller/AppointmentController.js';
import IndexModel from '../model/IndexModel.js';
import IndexView from '../view/IndexView.js';
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  private readonly appointment: AppointmentController;
  // private readonly movies: MoviesController
  // private readonly error: ErrorController
  // private readonly contact: ContactController

  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.appointment = Appointment.create();
    // this.menu = Menu.create()
    // this.error = Error404.create()
    // this.contact = Contact.create()
  }

  public init = async (): Promise<void> => {
    this.indexModel.init();
    this.loadMain(this.indexView.getPageFromMeta());
    //  this.loadMain(this.indexView.getPageFromMeta())
  };

  public loadMain = async (component: string): Promise<void> => {
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

  public loadAppointment = async (): Promise<void> => {
    this.appointment.init();
  };
}
