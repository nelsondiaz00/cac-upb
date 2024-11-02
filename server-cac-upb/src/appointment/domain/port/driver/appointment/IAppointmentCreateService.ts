import IAppointmentClientData from '../../../types/IAppointmentClientData';

export default interface IAppointmentCreateService {
  create(appointment: IAppointmentClientData): Promise<boolean>;
}
