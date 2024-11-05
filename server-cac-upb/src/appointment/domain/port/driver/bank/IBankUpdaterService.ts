export default interface IBankUpdaterService {
  updateBank(
    idTicket: string,
    identificationEmployee: string
  ): Promise<boolean>;
}
