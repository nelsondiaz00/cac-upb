export default interface IAppointmentRouterExpress {
  getAppointments(): void;
  getAppointmentById(): void;
  addAppointment(): void;
  updateAppointment(): void;
  deleteAppointment(): void;
  getAppointmentsDeleted(): void;
}
