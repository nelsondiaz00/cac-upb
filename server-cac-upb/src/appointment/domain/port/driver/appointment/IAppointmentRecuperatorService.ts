import Appointment from '../../../model/appointment/Appointment';

export default interface IAppointmentRecuperatorService {
  recuperatorAll(): Promise<Appointment[]>;
  recuperatorById(id: string): Promise<Appointment>;
}
