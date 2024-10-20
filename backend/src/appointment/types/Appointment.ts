import Client from '../../client-component/types/Client';

export default class Appointment {
  private id: string;
  private client: Client;
  private type: string;
  private date: Date;
  private address: string;

  constructor(
    id: string,
    client: Client,
    type: string,
    date: Date,
    address: string
  ) {
    this.id = id;
    this.client = client;
    this.type = type;
    this.date = date;
    this.address = address;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getClient(): Client {
    return this.client;
  }

  public setClient(client: Client): void {
    this.client = client;
  }

  public getType(): string {
    return this.type;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public isAvailable(actualDate: Date): boolean {
    return this.date > actualDate;
  }

  public save(): void {}

  public update(): void {}

  public cancel(): void {}

  public isNull(): boolean {
    return false;
  }
}
