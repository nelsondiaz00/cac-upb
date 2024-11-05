import Bank from '../../../model/bank/Bank';

export default interface IBankRecuperatorService {
  retrieveBankByTicket(ticket: string): Promise<Bank>;
}
