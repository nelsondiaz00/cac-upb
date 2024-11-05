import Employee from '../employee/Employee';
import NullTicket from '../ticket/NullTicket';
import Ticket from '../ticket/Ticket';

export default class Bank {
  private id: string;
  private name: string;
  private address: string;
  private employee: Employee;
  private ticket?: Ticket;

  constructor(id: string, name: string, address: string, employee: Employee) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.employee = employee;
  }

  public get getId(): string {
    return this.id;
  }
  public set setId(id: string) {
    this.id = id;
  }
  public get getName(): string {
    return this.name;
  }
  public set setName(name: string) {
    this.name = name;
  }
  public get getAddress(): string {
    return this.address;
  }
  public set setAddress(address: string) {
    this.address = address;
  }
  public get getEmployee(): Employee {
    return this.employee;
  }
  public set setEmployee(employee: Employee) {
    this.employee = employee;
  }
  public get getTicket(): Ticket {
    if (this.ticket) {
      return this.ticket;
    }
    return new NullTicket();
  }
  public set setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }
  public isNull(): boolean {
    return false;
  }
}
