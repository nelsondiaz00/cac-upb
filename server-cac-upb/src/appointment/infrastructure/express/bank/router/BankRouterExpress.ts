import RouterExpress from '../../../../../express/domain/RouterExpress';
import IBankControllerExpress from '../../../../domain/port/driver/bank/IBankControllerExpress';
import IBankRouterExpress from '../../../../domain/port/driver/bank/IBankRouterExpress';

export default class BankRouterExpress
  extends RouterExpress
  implements IBankRouterExpress
{
  constructor(private readonly bankControllerExpress: IBankControllerExpress) {
    super();
    this.routes();
  }
  public routes = (): void => {
    this.getBankByTicket();
    this.updateBank();
  };
  getBankByTicket(): void {
    this.router.get(
      '/banks/bank/:idTicket',
      this.bankControllerExpress.readBankByTicket.bind(
        this.bankControllerExpress
      )
    );
  }
  updateBank(): void {
    this.router.patch(
      '/banks/bank/update',
      this.bankControllerExpress.updateTicket.bind(this.bankControllerExpress)
    );
  }
}
