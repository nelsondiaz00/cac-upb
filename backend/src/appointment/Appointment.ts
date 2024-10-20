import AppointmentController from './controller/AppointmentController';
import AppointmentModel from './model/AppointmentModel';
import AppointmentView from './view/AppointmentView';

export default class Movies {
  public static readonly createView = (): AppointmentView => {
    const model = new AppointmentModel();
    const controller = new AppointmentController(model);
    return new AppointmentView(controller);
  };
}
