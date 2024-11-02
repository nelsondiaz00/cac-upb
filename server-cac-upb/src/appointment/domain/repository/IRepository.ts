export default interface IRepository<T, E, F> {
  // clients
  findClientByIdentification(identification: string): Promise<E>;
  findClientById(identification: string): Promise<E>;
  //appointments
  findAllAppointments(): Promise<T[]>;
  findAppointmentById(id: string): Promise<T>;
  saveAppointment(appointment: F): Promise<boolean>;
  deleteAppointmentById(id: string): Promise<boolean>;
  updateAppointment(appointment: F): Promise<boolean>;
  findAppointmentDeleted(): Promise<T[]>;
}
