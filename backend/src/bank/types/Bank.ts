import Employee from '../../employee/types/Employee';
import NullTicket from '../../ticket/types/NullTicket';
import Ticket from '../../ticket/types/Ticket';

export default class Bank {
  private employee: Employee;
  private ticket: Ticket[];
  private currentTicket: Ticket;

  constructor(employee: Employee) {
    this.employee = employee;
    this.ticket = [];
    this.currentTicket = new NullTicket();
  }

  public getEmployee(): Employee {
    return this.employee;
  }

  public setEmployee(employee: Employee): void {
    this.employee = employee;
  }

  public getTickets(): Ticket[] {
    return this.ticket;
  }

  public getCurrentTicket(): Ticket {
    return this.currentTicket;
  }

  public setCurrentTicket(ticket: Ticket): void {
    this.currentTicket = ticket;
  }

  public addTicket(ticket: Ticket): void {
    this.ticket.push(ticket);
  }

  public deleteTicket(turn: string): void {
    this.ticket = this.ticket.filter((ticket) => ticket.getTurn() !== turn);
  }

  public nextTicket(): void {
    if (this.ticket.length > 0) {
      this.currentTicket = this.ticket.shift() as Ticket;
    }
  }
}
