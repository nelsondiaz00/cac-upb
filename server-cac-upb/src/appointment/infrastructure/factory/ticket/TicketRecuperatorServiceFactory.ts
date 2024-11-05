import TicketRecuperatorService from '../../../application/service/TicketServices/TicketRecuperatorService';
import ITicketRecuperatorService from '../../../domain/port/driver/ticket/ITicketRecuperatorService';
import AppointmentRecuperatorServiceFactory from '../appointment/AppointmentRecuperatorServiceFactory';
import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';

export default class TicketRecuperatorServiceFactory {
  public static readonly create = (): ITicketRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const appointmentRecuperatorService =
      AppointmentRecuperatorServiceFactory.create();
    return new TicketRecuperatorService(
      CacUPBRepository,
      appointmentRecuperatorService
    );
  };
}
