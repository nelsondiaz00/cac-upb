import { Request, Response } from 'express';
import NullPerson from '../../shared/NullPerson';
import ClientModel from '../model/ClientModel';

export default class ClientController {
  constructor(private readonly clientModel: ClientModel) {}

  public getClientById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const ticket = await this.clientModel.getClientById(id);
      res.json(ticket);
    } else {
      res.json(NullPerson);
    }
  };

  public getClients = async (_req: Request, res: Response): Promise<void> => {
    const ticket = await this.clientModel.getClients();
    res.json(ticket);
  };
}
