import Appointment from '../../../model/appointment/Appointment';

export default interface IAppointmentDeletedRecuperatorService {
  recuperatorAll(): Promise<Appointment[]>;
}
