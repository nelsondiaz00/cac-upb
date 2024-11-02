import mysql from 'mysql2/promise';
import Ticket from '../types/Ticket';
import NullTicket from '../types/NullTicket';
import Client from '../../client-component/types/Client';
import Appointment from '../../appointment/types/Appointment';
import NullAppointment from '../../appointment/types/NullAppointment';
import ClientPriorityQueue from '../helper/queueHelper/priorityQueueHelper';

export default class TicketModel {
  private connection!: mysql.Connection;
  constructor() {
    this.connectToDB();
  }
  private async connectToDB(): Promise<void> {
    const HOST = process.env['HOST'] ?? 'localhost';
    const USER_DB = process.env['USER_DB'] ?? 'root';
    const PASSWORD_DB = process.env['PASSWORD_DB'] ?? '1234';
    const DB_NAME = process.env['DB_NAME'] ?? 'CacUPBDB';

    this.connection = await mysql.createConnection({
      host: HOST,
      user: USER_DB,
      password: PASSWORD_DB,
      database: DB_NAME,
    });
  }

  public async getTicketById(id: string): Promise<Ticket | NullTicket> {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE turn = ?',
      [id]
    );
    if (ticketRows.length > 0) {
      const ticketRow = ticketRows[0];

      const [appointmentRows]: any = await this.connection.execute(
        'SELECT * FROM Appointment WHERE id = ?',
        [ticketRow.appointment_id]
      );

      if (appointmentRows.length > 0) {
        const appointmentRow = appointmentRows[0];
        const [clientRows]: any = await this.connection.execute(
          'SELECT * FROM Client WHERE id = ?',
          [appointmentRow.client_id]
        );

        if (clientRows.length > 0) {
          const clientRow = clientRows[0];
          const client = new Client(
            clientRow.identification,
            clientRow.name,
            clientRow.lastname,
            new Date(clientRow.birthday),
            clientRow.address,
            clientRow.premium
          );

          const appointment = new Appointment(
            appointmentRow.id,
            client,
            appointmentRow.type,
            new Date(appointmentRow.date),
            appointmentRow.address,
            appointmentRow.description,
            appointmentRow.notes
          );
          return new Ticket(ticketRow.turn, appointment);
        }
      } else {
        return new Ticket(ticketRow.turn, new NullAppointment());
      }
    } else {
      return new NullTicket();
    }
    return new NullTicket();
  }

  public async getTickets(): Promise<Ticket[]> {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket'
    );
    const tickets: Ticket[] = [];
    for (const ticketRow of ticketRows) {
      const [appointmentRows]: any = await this.connection.execute(
        'SELECT * FROM Appointment WHERE id = ?',
        [ticketRow.appointment_id]
      );
      if (appointmentRows.length > 0) {
        const appointmentRow = appointmentRows[0];
        const [clientRows]: any = await this.connection.execute(
          'SELECT * FROM Client WHERE id = ?',
          [appointmentRow.client_id]
        );
        if (clientRows.length > 0) {
          const clientRow = clientRows[0];
          const client = new Client(
            clientRow.identification,
            clientRow.name,
            clientRow.lastname,
            new Date(clientRow.birthday),
            clientRow.address,
            clientRow.premium
          );
          const appointment = new Appointment(
            appointmentRow.id,
            client,
            appointmentRow.type,
            new Date(appointmentRow.date),
            appointmentRow.address,
            appointmentRow.description,
            appointmentRow.notes
          );
          const ticket = new Ticket(ticketRow.turn, appointment);
          ticket.setState(ticketRow.state === 1);
          tickets.push(ticket);
        }
      }
    }
    return tickets;
  }

  public createTicket = async (appointmentId: string): Promise<Ticket> => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM Appointment WHERE id = ?',
      [appointmentId]
    );
    if (appointmentRows.length > 0) {
      const appointmentRow = appointmentRows[0];
      const appointmentDate = new Date(appointmentRow.date);
      const currentDate = new Date();

      if (currentDate > appointmentDate) {
        console.log("Can't create ticket for past appointments");
        return new NullTicket();
      }
      console.log(currentDate);

      const [clientRows]: any = await this.connection.execute(
        'SELECT * FROM Client WHERE id = ?',
        [appointmentRow.client_id]
      );
      if (clientRows.length > 0) {
        const clientRow = clientRows[0];
        const client = new Client(
          clientRow.identification,
          clientRow.name,
          clientRow.lastname,
          new Date(clientRow.birthday),
          clientRow.address,
          clientRow.premium
        );
        const appointment = new Appointment(
          appointmentRow.id,
          client,
          appointmentRow.type,
          new Date(appointmentRow.date),
          appointmentRow.address,
          appointmentRow.description,
          appointmentRow.notes
        );

        const [existingTicketRows]: any = await this.connection.execute(
          'SELECT * FROM Ticket WHERE appointment_id = ?',
          [appointmentRow.id]
        );
        if (existingTicketRows.length > 0) {
          console.log('Ticket already exists');
          return new NullTicket();
        }

        const [lastTurnRow]: any = await this.connection.execute(
          'SELECT turn FROM Ticket ORDER BY id DESC LIMIT 1'
        );
        let lastTurn = lastTurnRow[0]?.turn || 'A000';

        let turnNumber = parseInt(lastTurn.slice(1)) + 1;
        let newTurn = `A${turnNumber.toString().padStart(3, '0')}`;

        await this.connection.execute(
          'INSERT INTO Ticket (turn, appointment_id) VALUES (?, ?)',
          [newTurn, appointmentId]
        );

        return new Ticket(newTurn, appointment);
      }
    }
    return new NullTicket();
  };

  public async deleteTicket(id: string): Promise<boolean> {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE turn = ?',
      [id]
    );
    if (ticketRows.length > 0) {
      await this.connection.execute('DELETE FROM Ticket WHERE turn = ?', [id]);
      return true;
    }
    return false;
  }

  public async deactivateTicket(id: string): Promise<boolean> {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE turn = ?',
      [id]
    );
    if (ticketRows.length > 0) {
      await this.connection.execute(
        'UPDATE Ticket SET state = 0 WHERE turn = ?',
        [id]
      );
      return true;
    }
    return false;
  }

  public async getQueue(): Promise<Ticket[]> {
    try {
      const priorityQueue = new ClientPriorityQueue();
      const tickets = await this.getTickets();

      for (const ticket of tickets) {
        if (ticket.getState()) {
          priorityQueue.enqueue(ticket);
        }
      }
      return priorityQueue.getAllTickets();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public async nextTicket(): Promise<Ticket | NullTicket> {
    try {
      const queue = await this.getQueue();
      const ticket = queue.shift();
      if (ticket) {
        await this.deactivateTicket(ticket.getTurn());
        return ticket;
      } else {
        return new NullTicket();
      }
    } catch (e) {
      console.log(e);
      return new NullTicket();
    }
  }

  public async peekQueue(): Promise<Ticket | NullTicket> {
    try {
      const queue = await this.getQueue();
      const ticket = queue[0];
      return ticket ? ticket : new NullTicket();
    } catch (e) {
      console.log(e);
      return new NullTicket();
    }
  }
}
