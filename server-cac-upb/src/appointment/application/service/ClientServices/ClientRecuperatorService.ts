import Client from '../../../domain/model/client/Client';
import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import IClientRecuperatorService from '../../../domain/port/driver/client/IClientRecuperatorService';
import PremiumProvider from '../../../infrastructure/repository/database/provider/PremiumProvider';
import { getDate } from '../../../util/dates';

export default class ClientRecuperatorService
  implements IClientRecuperatorService
{
  constructor(private readonly CacUPBRepository: ICacUPBRepository) {}
  async recuperatorById(id: string): Promise<Client> {
    const client = await this.CacUPBRepository.findClientById(id);
    return new Client(
      client.identification,
      client.name,
      client.lastname,
      getDate(client.birthdate),
      client.address,
      PremiumProvider.get(client.premium)
    );
  }

  async recuperatorByIdentification(identification: string): Promise<Client> {
    const client = await this.CacUPBRepository.findClientByIdentification(
      identification
    );
    return new Client(
      client.identification,
      client.name,
      client.lastname,
      getDate(client.birthdate),
      client.address,
      PremiumProvider.get(client.premium)
    );
  }
}
