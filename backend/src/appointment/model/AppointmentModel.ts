import Client from '../../client-component/types/Client';
import Appointment from '../types/Appointment';
import mysql from 'mysql2/promise';
import NullAppointment from '../types/NullAppointment';

export default class AppointmentModel {
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
  public async getAppointmentById(
    id: string
  ): Promise<Appointment | NullAppointment> {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM Appointment WHERE id = ?',
      [id]
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
          clientRow.address
        );

        const appointment = new Appointment(
          appointmentRow.id,
          client,
          appointmentRow.type,
          new Date(appointmentRow.date),
          appointmentRow.address
        );

        return appointment;
      } else {
        return new NullAppointment();
      }
    }
    return new NullAppointment();
  }

  public getAppointments = async (): Promise<Appointment[]> => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM Appointment'
    );

    const appointments: Appointment[] = [];

    for (const appointmentRow of appointmentRows) {
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
          clientRow.address
        );

        const appointment = new Appointment(
          appointmentRow.id,
          client,
          appointmentRow.type,
          new Date(appointmentRow.date),
          appointmentRow.address
        );

        appointments.push(appointment);
      }
    }

    return appointments;
  };

  public getAppointmentsDeleted = async (): Promise<Appointment[]> => {
    const [appointmentRows]: any = await this.connection.execute(
      'SELECT * FROM DeletedAppointment'
    );

    const appointments: Appointment[] = [];

    for (const appointmentRow of appointmentRows) {
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
          clientRow.address
        );

        const appointment = new Appointment(
          appointmentRow.id,
          client,
          appointmentRow.type,
          new Date(appointmentRow.date),
          appointmentRow.address
        );

        appointments.push(appointment);
      }
    }

    return appointments;
  };

  public updateAppointment = async (
    appointment: Appointment
  ): Promise<void> => {
    const queryClientId = `
      SELECT id FROM client 
      WHERE identification = ?;
    `;

    const queryUpdateAppointment = `
      UPDATE Appointment 
      SET client_id = ?, type = ?, date = ?, address = ?
      WHERE id = ?;
    `;

    const [rows]: any = await this.connection.execute(queryClientId, [
      appointment.getClient().getIdentification(),
    ]);

    if ((rows as any[]).length === 0) {
      throw new Error('Cliente no encontrado');
    }

    const clientId = (rows[0] as { id: number }).id;

    await this.connection.execute(queryUpdateAppointment, [
      clientId,
      appointment.getType(),
      appointment.getDate(),
      appointment.getAddress(),
      appointment.getId(),
    ]);
  };

  public createAppointment = async (
    appointment: Appointment
  ): Promise<void> => {
    const queryClientId = `
      SELECT id FROM client 
      WHERE identification = ?;
    `;

    const queryInsertAppointment = `
      INSERT INTO Appointment (client_id, type, date, address)
      VALUES (?, ?, ?, ?);
    `;

    const [rows]: any = await this.connection.execute(queryClientId, [
      appointment.getClient().getIdentification(),
    ]);

    if ((rows as any[]).length === 0) {
      throw new Error('Cliente no encontrado');
    }

    const clientId = (rows[0] as { id: number }).id;

    await this.connection.execute(queryInsertAppointment, [
      clientId,
      appointment.getType(),
      appointment.getDate(),
      appointment.getAddress(),
    ]);
  };

  public deleteAppointment = async (id: string): Promise<void> => {
    const querySelectAppointment = `
      SELECT * FROM Appointment WHERE id = ?;
    `;

    const queryInsertDeletedAppointment = `
      INSERT INTO DeletedAppointment (id, client_id, type, date, address)
      VALUES (?, ?, ?, ?, ?);
    `;

    const queryDeleteAppointment = `
      DELETE FROM Appointment WHERE id = ?;
    `;

    try {
      await this.connection.beginTransaction();

      const [rows]: any = await this.connection.execute(
        querySelectAppointment,
        [id]
      );

      if (rows.length === 0) {
        throw new Error('Cita no encontrada');
      }

      const appointment = rows[0];

      await this.connection.execute(queryInsertDeletedAppointment, [
        appointment.id,
        appointment.client_id,
        appointment.type,
        appointment.date,
        appointment.address,
      ]);

      await this.connection.execute(queryDeleteAppointment, [id]);

      await this.connection.commit();
    } catch (error) {
      await this.connection.rollback();
    }
  };
}
