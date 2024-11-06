import Bank from '../../domain/model/bank/Bank';
import IBankRecuperatorService from '../../domain/port/driver/bank/IBankRecuperatorService';
import IBankUpdaterService from '../../domain/port/driver/bank/IBankUpdaterService';
import IBankUseCase from '../../domain/port/driver/bank/IBankUseCase';

export default class BankUseCase implements IBankUseCase {
  constructor(
    private readonly bankRecuperatorService: IBankRecuperatorService,
    private readonly bankUpdaterService: IBankUpdaterService
  ) {}

  getBankByEmployeeIdentificacion(
    employeeIdentification: string
  ): Promise<Bank> {
    return this.bankRecuperatorService.retrieveBankByEmployeeIdentification(
      employeeIdentification
    );
  }
  async getBankByTicket(ticket: string): Promise<Bank> {
    return await this.bankRecuperatorService.retrieveBankByTicket(ticket);
  }
  async updateBank(
    idTicket: string,
    identificationEmployee: string
  ): Promise<boolean> {
    return await this.bankUpdaterService.updateBank(
      idTicket,
      identificationEmployee
    );
  }
}
