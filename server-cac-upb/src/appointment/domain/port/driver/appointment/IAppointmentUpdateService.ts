import IAppointmentClientData from '../../../types/IAppointmentClientData';

export default interface IAppointmentUpdateService {
  update(appointmentClientData: IAppointmentClientData): Promise<boolean>;
}
