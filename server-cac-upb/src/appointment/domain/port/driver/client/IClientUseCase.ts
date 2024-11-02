import Client from '../../../model/client/Client';

export default interface IClientUseCase {
  getClientByIdentification(id: string): Promise<Client>;
  getClientById(id: string): Promise<Client>;
}
