import AbstractPerson from '../../shared/AbstractPerson';

export default class Client extends AbstractPerson {
  private premium: boolean = false;
  constructor(
    identification: string,
    name: string,
    lastname: string,
    birthday: Date,
    address: string,
    premium: boolean
  ) {
    super(identification, name, lastname, birthday, address);
    this.premium = premium;
  }
  public isNull(): boolean {
    return false;
  }
  public isPremium(): boolean {
    return this.premium;
  }
  public setPremium(premium: boolean): void {
    this.premium = premium;
  }
  public getAge(): number {
    const ageDiff = Date.now() - this.birthday.getTime();
    return new Date(ageDiff).getUTCFullYear() - 1970;
  }
}
