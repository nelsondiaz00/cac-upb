import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ITicketCreatorService from '../../../domain/port/driver/ticket/ITicketCreatorService';
import TicketCreatorService from '../../../application/service/TicketServices/TicketCreatorService';
import AppointmentRecuperatorServiceFactory from '../appointment/AppointmentRecuperatorServiceFactory';

export default class TicketCreatorServiceFactory {
  public static readonly create = (): ITicketCreatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const appointmentRecuperatorService =
      AppointmentRecuperatorServiceFactory.create();
    return new TicketCreatorService(
      CacUPBRepository,
      appointmentRecuperatorService
    );
  };
}
