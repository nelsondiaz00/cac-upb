import Appointment from '../../../shared/types/Appointment';

export default class Ticket {
  private turn: string;
  private appointment: Appointment;
  private state: boolean;
  private _isNull: boolean;

  constructor(turn: string, appointment: Appointment) {
    this.turn = turn;
    this.appointment = appointment;
    this.state = true;
    this._isNull = false;
  }

  public getState(): boolean {
    return this.state;
  }

  public setState(state: boolean): void {
    this.state = state;
  }

  public getTurn(): string {
    return this.turn;
  }

  public setTurn(turn: string): void {
    this.turn = turn;
  }

  public getAppointment(): Appointment {
    return this.appointment;
  }

  public setAppointment(appointment: Appointment): void {
    this.appointment = appointment;
  }

  public isNull(): boolean {
    return this._isNull;
  }
}
