import Client from './Client.js';

export default class Appointment {
  private id: string;
  private client: Client;
  private type: string;
  private date: Date;
  private address: string;
  private description: string;
  private notes: string;

  constructor(
    id: string,
    client: Client,
    type: string,
    date: Date,
    address: string,
    description: string,
    notes: string
  ) {
    this.id = id;
    this.client = client;
    this.type = type;
    this.date = date;
    this.address = address;
    this.description = description;
    this.notes = notes;
  }

  public getNotes(): string {
    return this.notes;
  }

  public setNotes(notes: string): void {
    this.notes = notes;
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
    if (this.date instanceof Date) {
      return this.date;
    }
    return new Date(this.date);
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

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  // public save(): void {}

  // public update(): void {}

  // public cancel(): void {}

  public isNull(): boolean {
    return false;
  }
}
