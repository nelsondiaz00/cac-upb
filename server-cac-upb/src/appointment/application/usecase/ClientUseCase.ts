import Client from '../../domain/model/client/Client';
import IClientRecuperatorService from '../../domain/port/driver/client/IClientRecuperatorService';
import IClientUseCase from '../../domain/port/driver/client/IClientUseCase';

export default class ClientUseCase implements IClientUseCase {
  constructor(
    private readonly clientRecuperatorService: IClientRecuperatorService
  ) {}
  public async getClientById(id: string): Promise<Client> {
    return await this.clientRecuperatorService.recuperatorById(id);
  }

  public async getClientByIdentification(identification: string) {
    return await this.clientRecuperatorService.recuperatorByIdentification(
      identification
    );
  }
}
