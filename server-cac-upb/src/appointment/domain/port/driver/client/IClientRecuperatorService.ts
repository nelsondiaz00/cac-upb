import Client from '../../../model/client/Client';

export default interface IClientRecuperatorService {
  recuperatorByIdentification(id: string): Promise<Client>;
  recuperatorById(id: string): Promise<Client>;
}
