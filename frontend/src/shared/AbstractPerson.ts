export default abstract class AbstractPerson {
  protected identification: string;
  protected name: string;
  protected lastname: string;
  protected birthday: Date;
  protected address: string;
  protected _isNull: boolean;

  constructor(
    identification: string,
    name: string,
    lastname: string,
    birthday: Date,
    address: string
  ) {
    this.identification = identification;
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
    this.address = address;
    this._isNull = false;
  }

  // Abstract method
  public abstract isNull(): boolean;

  // Getters
  public getIdentification(): string {
    return this.identification;
  }

  public getName(): string {
    return this.name;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public getBirthday(): Date {
    if (this.birthday instanceof Date) {
      return this.birthday;
    }
    return new Date(this.birthday);
  }

  public getAddress(): string {
    return this.address;
  }

  public isNullValue(): boolean {
    return this._isNull;
  }

  // Setters
  public setIdentification(identification: string): void {
    this.identification = identification;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  public setBirthday(birthday: Date): void {
    this.birthday = birthday;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setNullValue(isNull: boolean): void {
    this._isNull = isNull;
  }
}
