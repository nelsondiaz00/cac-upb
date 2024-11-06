export default interface IRepository<T, E, F, G, H, I> {
  // clients
  findClientByIdentification(identification: string): Promise<E>;
  findClientById(identification: string): Promise<E>;
  //appointments
  findAllAppointments(): Promise<T[]>;
  findAppointmentById(id: string): Promise<T>;
  saveAppointment(appointment: F): Promise<string>;
  deleteAppointmentById(id: string): Promise<boolean>;
  updateAppointment(appointment: F): Promise<boolean>;
  findAppointmentDeleted(): Promise<T[]>;
  //tickets
  findTicketById(id: string): Promise<G>;
  findAllTickets(): Promise<G[]>;
  saveTicket(idAppointment: string): Promise<G>;
  deleteTicketById(id: string): Promise<boolean>;
  deactiveTicket(idAppointment: string): Promise<boolean>;
  // tickets - queue
  findTicketsQueue(): Promise<G[]>;

  // employees
  findEmployees(): Promise<H[]>;
  findEmployeeByEmail(email: string): Promise<H>;
  findEmployeeByIdentification(id: string): Promise<H>;
  findEmployeeById(id: string): Promise<H>;
  saveEmployee(employee: H): Promise<boolean>;

  // bank
  findBankByIdTicket(turn: string): Promise<I>;
  updateBank(turn: string, identificationEmployee: string): Promise<boolean>;
  findBankByIdEmployee(identification: string): Promise<I>;
}
