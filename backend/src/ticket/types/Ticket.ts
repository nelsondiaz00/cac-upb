import Appointment from '../../appointment/types/Appointment';

export default class Ticket {
  private turn: string;
  private appointment: Appointment;

  constructor(turn: string, appointment: Appointment) {
    this.turn = turn;
    this.appointment = appointment;
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
}
