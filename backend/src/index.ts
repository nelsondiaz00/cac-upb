import Appointment from './appointment/Appointment';
import Client from './client-component/Client';
import Employee from './employee/Employee';
import Server from './express/Server';
import Ticket from './ticket/Ticket';

const appointmentView = Appointment.createView();

const clientView = Client.createView();

const ticketView = Ticket.createView();

const employeeView = Employee.createView();

const server = new Server(
  appointmentView,
  ticketView,
  employeeView,
  clientView
);
server.start();
