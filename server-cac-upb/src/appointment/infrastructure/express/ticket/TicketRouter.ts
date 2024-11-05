import RouterExpress from '../../../../express/domain/RouterExpress';
import TicketUseCase from '../../../application/usecase/TicketUseCase';
import TicketCreatorServiceFactory from '../../factory/ticket/TicketCreatorServiceFactory';
import TicketDeactivateServiceFactory from '../../factory/ticket/TicketDeactivateServiceFactory';
import TicketDeleterServiceFactory from '../../factory/ticket/TicketDeleterServiceFactory';
import TicketQueueRecuperatorServiceFactory from '../../factory/ticket/TicketQueueRecuperatorServiceFactory';
import TicketRecuperatorServiceFactory from '../../factory/ticket/TicketRecuperatorServiceFactory';
import TicketControllerExpress from './controller/TicketControllerExpress';
import TicketRouterExpress from './router/TicketRouterExpress';

export default class TicketRouter {
  public static readonly create = (): RouterExpress => {
    const ticketCreatorService = TicketCreatorServiceFactory.create();
    const ticketDeactivateService = TicketDeactivateServiceFactory.create();
    const ticketDeleterService = TicketDeleterServiceFactory.create();
    const ticketQueueRecuperatorService =
      TicketQueueRecuperatorServiceFactory.create();
    const ticketRecuperatorService = TicketRecuperatorServiceFactory.create();

    const ticketUseCase = new TicketUseCase(
      ticketCreatorService,
      ticketDeactivateService,
      ticketDeleterService,
      ticketRecuperatorService,
      ticketQueueRecuperatorService
    );

    // TODO: validate use case
    const ticketControllerExpress = new TicketControllerExpress(ticketUseCase);
    // TODO: validate controller
    return new TicketRouterExpress(ticketControllerExpress);
  };
}
