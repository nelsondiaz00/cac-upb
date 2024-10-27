import Appointment from './appointment/Appointment';
import Client from './client-component/Client';
import Employee from './employee/Employee';
import Server from './express/Server';
import Ticket from './ticket/Ticket';
import ClientAppointmentPublic from './client/client-appointment/ClientPublic';
import ClientTicketPublic from './client/client-ticket/ClientPublic';
const appointmentView = Appointment.createView();

const clientView = Client.createView();

const ticketView = Ticket.createView();

const employeeView = Employee.createView();

const clientPublicView = ClientAppointmentPublic.createView();

const clientTicketPublicView = ClientTicketPublic.createView();

const server = new Server(
  appointmentView,
  ticketView,
  employeeView,
  clientView,
  clientPublicView,
  clientTicketPublicView
);
server.start();
