import Administrator from './Administrator';

export default class NullAdministrator extends Administrator {
  constructor() {
    super();
  }

  public override isNull(): boolean {
    return true;
  }
}
