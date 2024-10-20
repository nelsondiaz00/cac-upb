import Appointment from '../../appointment/types/Appointment';

export default class Administrator {
  public appointment: Appointment[];

  constructor() {
    this.appointment = [];
  }

  public isNull(): boolean {
    return false;
  }
}
