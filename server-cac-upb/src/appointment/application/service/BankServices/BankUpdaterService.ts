import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IBankUpdaterService from '../../../domain/port/driver/bank/IBankUpdaterService';

export default class BankUpdaterService implements IBankUpdaterService {
  constructor(private readonly CacUPBRepository: ICacUPBRepository) {}
  async updateBank(
    idTicket: string,
    identificationEmployee: string
  ): Promise<boolean> {
    return await this.CacUPBRepository.updateBank(
      idTicket,
      identificationEmployee
    );
  }
}
