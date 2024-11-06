import mysql from 'mysql2/promise';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';
import { getDate } from '../../../util/dates';
import ITicketData from '../../../domain/types/ITicketData';
import IEmployeeData from '../../../domain/types/IEmployeeData';

export default class CacUPBDB {
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

  public async getBankByTicket(turn: string): Promise<any> {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Bank WHERE current_ticket_turn = ?',
      [turn]
    );
    return rows[0];
  }

  public async getBankByEmployeeId(
    employeeIdentification: string
  ): Promise<any> {
    console.log(employeeIdentification);
    const employeeDb = await this.getEmployeeByIdentification(
      employeeIdentification
    );
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Bank WHERE employee_id = ?',
      [employeeDb.id]
    );
    return rows[0];
  }

  public async updateBank(
    turn: string,
    identificationEmployee: string
  ): Promise<boolean> {
    const employeeDb = await this.getEmployeeByIdentification(
      identificationEmployee
    );
    const [result]: any = await this.connection.execute(
      'UPDATE bank SET current_ticket_turn = ? WHERE employee_id = ?',
      [turn, employeeDb.id]
    );
    return result.affectedRows > 0;
  }
  public async getEmployees(): Promise<any> {
    const [rows]: any = await this.connection.execute('SELECT * FROM Employee');
    return rows;
  }

  public async getEmployeeByEmail(email: string): Promise<any> {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Employee WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  public async getEmployeeByIdentification(id: string): Promise<any> {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Employee WHERE identification = ?',
      [id]
    );
    return rows[0];
  }

  public async getEmployeeById(id: string): Promise<any> {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Employee WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  public async createEmployee(employee: IEmployeeData): Promise<boolean> {
    try {
      await this.connection.execute(
        'INSERT INTO Employee (identification, name, lastname, birthday, address, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          employee.identification,
          employee.name,
          employee.lastname,
          employee.birthday,
          employee.address,
          employee.email,
          employee.password,
          employee.role,
        ]
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async getTickets() {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket'
    );
    return ticketRows;
  }

  public async getTicketById(turn: string) {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE turn = ?',
      [turn]
    );
    return ticketRows[0];
  }

  public async createTicket(idAppointment: string): Promise<ITicketData> {
    try {
      const existingTicketRows: any = await this.getTicketByIdAppointment(
        idAppointment
      );
      // console.log(existingTicketRows);
      if (existingTicketRows) {
        console.log('Ticket already exists');
        throw new Error('Ticket already exists');
      }

      const newTurn = await this.getTurn();

      await this.connection.execute(
        'INSERT INTO Ticket (turn, appointment_id) VALUES (?, ?)',
        [newTurn, idAppointment]
      );

      return await this.getLastTicketInserted();
    } catch (e) {
      console.log(e);
      throw new Error('Failed to create ticket');
    }
  }

  public async deleteTicket(turn: string): Promise<boolean> {
    try {
      const queryDeleteTicket = `
      DELETE FROM Ticket WHERE turn = ?;
    `;
      await this.connection.execute(queryDeleteTicket, [turn]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async deactiveTicket(turn: string): Promise<boolean> {
    try {
      const queryUpdateTicket = `
      UPDATE Ticket 
      SET state = ?
      WHERE turn = ?;
    `;
      await this.connection.execute(queryUpdateTicket, [0, turn]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async getQueue() {
    try {
      const queryQueueTicket = `
      SELECT * FROM Ticket WHERE state = 1;
      `;
      const [queueTickets]: any = await this.connection.execute(
        queryQueueTicket
      );

      setInterval(this.deleteExpiredAppointments, 1000);
      return queueTickets;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  private deleteExpiredAppointments = async () => {
    try {
      const queryGetExpiredAppointments = `
        SELECT id FROM Appointment WHERE date <= NOW();
      `;
      const [expiredAppointments] = await this.connection.execute(
        queryGetExpiredAppointments
      );

      for (const appointment of Array.from(expiredAppointments as any[])) {
        const appointmentId = appointment.id;

        const isDeleted = await this.deleteAppointment(appointmentId);
        if (!isDeleted) {
          console.warn(`No se pudo eliminar la cita con ID ${appointmentId}.`);
        }
      }
    } catch (e) {
      console.error('Error al eliminar citas vencidas:', e);
    }
  };

  public getClientByIdentification = async (identification: string) => {
    const [clientRows]: any = await this.connection.execute(
      'SELECT * FROM Client WHERE identification = ?',
      [identification]
    );

    return clientRows[0];
  };

  public getClientById = async (identification: string) => {
    const [clientRows]: any = await this.connection.execute(
      'SELECT * FROM Client WHERE id = ?',
      [identification]
    );
    return clientRows[0];
  };

  public getAppointments = async () => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM Appointment'
    );
    return appointmentRows;
  };

  public getDeletedAppointments = async () => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM deletedappointment'
    );
    return appointmentRows;
  };

  public getAppointmentById = async (id: string) => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM Appointment WHERE id = ?',
      [id]
    );
    return appointmentRows[0];
  };

  public createAppointment = async (
    appointment: IAppointmentClientData
  ): Promise<string> => {
    try {
      const queryInsertAppointment = `
      INSERT INTO Appointment (client_id, type, date, address, description, notes)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
      const clientId = await this.getIdClient(
        appointment.client_identification
      );

      await this.connection.execute(queryInsertAppointment, [
        clientId,
        appointment.type,
        getDate(appointment.date),
        appointment.address,
        appointment.description,
        appointment.notes,
      ]);
      const appointmentCount = await this.getCountAppointmentsPerClient(
        clientId
      );
      if (appointmentCount >= 8) {
        await this.updatePremiumStatus(clientId);
      }
      const lastAppointment = await this.getLastAppointmentInserted();
      return lastAppointment.id;
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  public deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      this.updateAppointmentNote(id, 'CITA CANCELADA');
      const queryDeleteAppointment = `
      DELETE FROM Appointment WHERE id = ?;
    `;
      console.log(id);
      await this.connection.beginTransaction();

      await this.createDeletedAppointment(id);

      await this.connection.execute(queryDeleteAppointment, [id]);

      await this.connection.commit();
      return true;
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      await this.connection.rollback();
      return false;
    }
  };

  public updateAppointmentNote = async (
    id: string,
    notes: string
  ): Promise<boolean> => {
    const queryUpdateAppointment = `
      UPDATE Appointment 
      SET notes = ?
      WHERE id = ?;
    `;

    // const clientId = await this.getIdClient(appointment.client_identification);
    await this.connection.execute(queryUpdateAppointment, [notes, id]);

    return true;
  };

  public updateAppointment = async (
    appointment: IAppointmentClientData
  ): Promise<boolean> => {
    const queryUpdateAppointment = `
      UPDATE Appointment 
      SET client_id = ?, type = ?, date = ?, address = ?, description = ?, notes = ?
      WHERE id = ?;
    `;

    const clientId = await this.getIdClient(appointment.client_identification);
    await this.connection.execute(queryUpdateAppointment, [
      clientId,
      appointment.type,
      getDate(appointment.date),
      appointment.address,
      appointment.description,
      appointment.notes,
      appointment.id,
    ]);

    return true;
  };

  private async getLastAppointmentInserted() {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Appointment WHERE id = LAST_INSERT_ID()'
    );

    return rows[0];
  }

  private async getLastTicketInserted() {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE id = LAST_INSERT_ID()'
    );

    return rows[0];
  }

  private createDeletedAppointment = async (id: string): Promise<boolean> => {
    try {
      const queryInsertDeletedAppointment = `
      INSERT INTO DeletedAppointment (id, client_id, type, date, address, description, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
      console.log(id);
      const appointment = await this.getAppointmentById(id);

      await this.connection.execute(queryInsertDeletedAppointment, [
        appointment.id,
        appointment.client_id,
        appointment.type,
        appointment.date,
        appointment.address,
        appointment.description,
        appointment.notes,
      ]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  private async getTicketByIdAppointment(id: string) {
    const [ticketRows]: any = await this.connection.execute(
      'SELECT * FROM Ticket WHERE appointment_id = ?',
      [id]
    );
    return ticketRows[0];
  }

  private async getTurn(): Promise<string> {
    const [lastTurnRow]: any = await this.connection.execute(
      'SELECT turn FROM Ticket ORDER BY id DESC LIMIT 1'
    );
    let lastTurn = lastTurnRow[0]?.turn || 'A000';

    let turnNumber = parseInt(lastTurn.slice(1)) + 1;
    return `A${turnNumber.toString().padStart(3, '0')}`;
  }

  private getCountAppointmentsPerClient = async (
    clientId: number
  ): Promise<number> => {
    if (clientId === undefined) return 0;
    const queryCountAppointments = `
    SELECT COUNT(*) as count FROM Appointment 
    WHERE client_id = ?;
    `;
    const [countRows]: any = await this.connection.execute(
      queryCountAppointments,
      [clientId]
    );
    return (countRows[0] as { count: number }).count;
  };

  private updatePremiumStatus = async (clientId: number): Promise<void> => {
    if (clientId === undefined) return;
    const queryUpdatePremiumStatus = `
    UPDATE client 
    SET premium = 1 
    WHERE id = ?;
    `;
    await this.connection.execute(queryUpdatePremiumStatus, [clientId]);
  };

  private getIdClient = async (identification: string): Promise<number> => {
    if (identification === undefined) return 0;
    const queryClientId = `SELECT id FROM client WHERE identification = ?;`;
    const [rows]: any = await this.connection.execute(queryClientId, [
      identification,
    ]);
    if ((rows as any[]).length === 0) {
      return 0;
    }
    return (rows[0] as { id: number }).id;
  };
}
