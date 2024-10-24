import Appointment from './appointment/Appointment';
import Client from './client-component/Client';
import Employee from './employee/Employee';
import Server from './express/Server';
import Ticket from './ticket/Ticket';
import ClientPublic from './client/ClientPublic';
const appointmentView = Appointment.createView();

const clientView = Client.createView();

const ticketView = Ticket.createView();

const employeeView = Employee.createView();

const clientPublicView = ClientPublic.createView();

const server = new Server(
  appointmentView,
  ticketView,
  employeeView,
  clientView,
  clientPublicView
);
server.start();
