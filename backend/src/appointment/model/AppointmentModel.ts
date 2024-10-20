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
          clientRow.id,
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
          clientRow.id,
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
    const query = `
      UPDATE Appointment 
      SET type = ?, date = ?, address = ?
      WHERE id = ?;
    `;

    // console.log(appointment);

    try {
      await this.connection.execute(query, [
        appointment.getType(),
        appointment.getDate(),
        appointment.getAddress(),
        appointment.getId(),
      ]);
    } catch (error) {
      console.error('Error al actualizar la cita: ', error);
      throw new Error('No se pudo actualizar la cita');
    }
  };

  public createAppointment = async (
    appointment: Appointment
  ): Promise<void> => {
    const query = `
      INSERT INTO Appointment (client_id, type, date, address)
      VALUES (?, ?, ?, ?);
    `;

    try {
      await this.connection.execute(query, [
        appointment.getClient().getIdentification(),
        appointment.getType(),
        appointment.getDate(),
        appointment.getAddress(),
      ]);
    } catch (error) {
      console.error('Error al agregar la cita: ', error);
      throw new Error('No se pudo agregar la cita');
    }
  };

  public deleteAppointment = async (id: string): Promise<void> => {
    const query = 'DELETE FROM Appointment WHERE id = ?';

    try {
      await this.connection.execute(query, [id]);
    } catch (error) {
      console.error('Error al eliminar la cita: ', error);
      throw new Error('No se pudo eliminar la cita');
    }
  };
}
