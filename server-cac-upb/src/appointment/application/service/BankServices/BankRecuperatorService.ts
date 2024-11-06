import Bank from '../../../domain/model/bank/Bank';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IBankRecuperatorService from '../../../domain/port/driver/bank/IBankRecuperatorService';
import IEmployeeRecuperatorService from '../../../domain/port/driver/employee/IEmployeeRecuperatorService';
import ITicketRecuperatorService from '../../../domain/port/driver/ticket/ITicketRecuperatorService';

export default class BankRecuperatorService implements IBankRecuperatorService {
  constructor(
    private readonly CacUPBRepository: ICacUPBRepository,
    private readonly employeeRecuperatorService: IEmployeeRecuperatorService,
    private readonly ticketRecuperatorService: ITicketRecuperatorService
  ) {}
  async retrieveBankByEmployeeIdentification(
    identification: string
  ): Promise<Bank> {
    const bankBD = await this.CacUPBRepository.findBankByIdEmployee(
      identification
    );
    const bank = new Bank(
      bankBD.id,
      bankBD.name,
      bankBD.address,
      await this.employeeRecuperatorService.retrieveEmployeeById(
        bankBD.employee_id
      )
    );
    bank.setTicket = await this.ticketRecuperatorService.recuperatorTicketById(
      bankBD.current_ticket_turn
    );
    return bank;
  }

  async retrieveBankByTicket(ticket: string): Promise<Bank> {
    const bankBD = await this.CacUPBRepository.findBankByIdTicket(ticket);
    const bank = new Bank(
      bankBD.id,
      bankBD.name,
      bankBD.address,
      await this.employeeRecuperatorService.retrieveEmployeeById(
        bankBD.employee_id
      )
    );
    bank.setTicket = await this.ticketRecuperatorService.recuperatorTicketById(
      bankBD.current_ticket_turn
    );
    return bank;
  }
}
