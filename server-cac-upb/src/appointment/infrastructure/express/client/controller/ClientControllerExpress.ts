import { Request, Response } from 'express';
import IClientControllerExpress from '../../../../domain/port/driver/client/IClientControllerExpress';
import IClientUseCase from '../../../../domain/port/driver/client/IClientUseCase';
import NullPerson from '../../../../domain/model/person/NullPerson';

export default class ClientControllerExpress
  implements IClientControllerExpress
{
  constructor(private readonly clientUseCase: IClientUseCase) {}
  async readClientById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json(new NullPerson());
        return;
      }
      const client = await this.clientUseCase.getClientById(id);
      res.status(200).json(client);
    } catch (e) {
      res.status(500).json(new NullPerson());
      console.error(e);
    }
  }
  async readClientByIdentification(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json(new NullPerson());
        return;
      }
      const client = await this.clientUseCase.getClientByIdentification(id);
      res.status(200).json(client);
    } catch (e) {
      res.status(500).json(new NullPerson());
      console.error(e);
    }
  }
}
