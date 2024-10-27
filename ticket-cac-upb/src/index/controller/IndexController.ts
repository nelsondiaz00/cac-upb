
import IndexModel from '../model/IndexModel.js';
import IndexView from '../view/IndexView.js';
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  private readonly createAppointment: CreateAppointmentController;
  private readonly updateAppointment: UpdateAppointmentController;
  // private readonly movies: MoviesController
  // private readonly error: ErrorController
  // private readonly contact: ContactController

  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.createAppointment = CreateAppointment.create();
    this.updateAppointment = UpdateAppointment.create();
    // this.menu = Menu.create()
    // this.error = Error404.create()
    // this.contact = Contact.create()
  }

  public init = async (): Promise<void> => {
    this.indexModel.init();
    this.loadMain(this.indexView.getPageFromMeta());
  };

  public loadMain = async (component: string): Promise<void> => {
    this.indexView.renderMain(component ?? 'error');
    switch (component) {
      case 'create-appointment':
        this.loadCreateAppointment();
        break;

      case 'update-appointment':
        this.loadUpdateAppointment();
        break;
      default:
        console.log('Error');
      //this.loadError();
    }
  };

  public loadCreateAppointment = async (): Promise<void> => {
    this.createAppointment.init();
  };

  public loadUpdateAppointment = async (): Promise<void> => {
    this.updateAppointment.init();
  };
}
