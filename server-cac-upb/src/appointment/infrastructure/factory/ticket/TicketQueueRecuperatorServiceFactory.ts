import CacUPBRepositoryFactory from '../repository/CacUPBRepositoryFactory';
import ITicketQueueRecuperatorService from '../../../domain/port/driver/ticket/ITicketQueueRecuperatorService';
import TicketQueueRecuperatorService from '../../../application/service/TicketServices/TicketQueueRecuperatorService';
import AppointmentRecuperatorServiceFactory from '../appointment/AppointmentRecuperatorServiceFactory';
import TicketDeactivateServiceFactory from './TicketDeactivateServiceFactory';

export default class TicketQueueRecuperatorServiceFactory {
  public static readonly create = (): ITicketQueueRecuperatorService => {
    const CacUPBRepository = CacUPBRepositoryFactory.create();
    const appointmentRecuperatorService =
      AppointmentRecuperatorServiceFactory.create();
    const ticketDeactivatorService = TicketDeactivateServiceFactory.create();
    return new TicketQueueRecuperatorService(
      CacUPBRepository,
      appointmentRecuperatorService,
      ticketDeactivatorService
    );
  };
}
