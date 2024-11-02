import AppointmentClientRetriverService from '../../application/service/AppointmentClientRetriverService';
import IAppointmentClientRetriverService from '../../domain/port/driver/appointment-client/IAppointmentClientRetriverService';

export default class AppointmentClientRetriverServiceFactory {
  public static readonly create = (): IAppointmentClientRetriverService => {
    return new AppointmentClientRetriverService();
  };
}
