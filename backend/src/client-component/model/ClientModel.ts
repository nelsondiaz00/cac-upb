import mysql from 'mysql2/promise';

import Client from '../types/Client';

export default class ClientModel {
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

  public async getClientById(id: string): Promise<Client> {
    const [clientRows]: any = await this.connection.execute(
      'SELECT * FROM Client WHERE identification = ?',
      [id]
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
      return client;
    }
    return new Client('', '', '', new Date(), '');
  }

  public async getClients(): Promise<Client[]> {
    const [clientRows]: any = await this.connection.execute(
      'SELECT * FROM Client'
    );
    const clients: Client[] = [];
    for (const clientRow of clientRows) {
      const client = new Client(
        clientRow.identification,
        clientRow.name,
        clientRow.lastname,
        new Date(clientRow.birthday),
        clientRow.address
      );
      clients.push(client);
    }
    return clients;
  }
}
