import mysql from 'mysql2/promise';
import IAppointmentClientData from '../../../domain/types/IAppointmentClientData';
import { getDate } from '../../../util/dates';

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
  ): Promise<boolean> => {
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
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  public deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      const queryDeleteAppointment = `
      DELETE FROM Appointment WHERE id = ?;
    `;
      console.log(id);
      await this.connection.beginTransaction();

      const appointmentDeleted = await this.createDeletedAppointment(id);

      if (!appointmentDeleted) {
        await this.connection.rollback();
        return false;
      }

      await this.connection.execute(queryDeleteAppointment, [id]);

      await this.connection.commit();
      return true;
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      await this.connection.rollback();
      return false;
    }
  };

  private createDeletedAppointment = async (id: string): Promise<boolean> => {
    try {
      const queryInsertDeletedAppointment = `
      INSERT INTO DeletedAppointment (id, client_id, type, date, address, description, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
      console.log(id);
      const appointment = await this.getAppointmentById(id);
      // const appointment = appointments[0];
      // console.log(appointment);
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
