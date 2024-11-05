import Bank from '../../../model/bank/Bank';

export default interface IBankUseCase {
  getBankByTicket(ticket: string): Promise<Bank>;
  updateBank(
    idTicket: string,
    identificationEmployee: string
  ): Promise<boolean>;
}
