import Appointment from './appointment/Appointment';
import Client from './client/Client';
import Server from './express/Server';
import Ticket from './ticket/Ticket';

const appointmentView = Appointment.createView();

const clientView = Client.createView();

const ticketView = Ticket.createView();

const server = new Server(clientView, appointmentView, ticketView);
server.start();
