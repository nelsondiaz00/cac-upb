import { Request, Response } from 'express';
import NullTicket from '../types/NullTicket';
import TicketModel from '../model/TicketModel';

export default class TicketController {
  constructor(private readonly ticketModel: TicketModel) {}

  public getTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const ticket = await this.ticketModel.getTicketById(id);
      res.json(ticket);
    } else {
      res.json(NullTicket);
    }
  };

  public getTickets = async (_req: Request, res: Response): Promise<void> => {
    const ticket = await this.ticketModel.getTickets();
    res.json(ticket);
  };

  public createTicket = async (req: Request, res: Response): Promise<void> => {
    const { appointmentId } = req.params;
    if (appointmentId) {
      const ticket = await this.ticketModel.createTicket(appointmentId);
      if (ticket instanceof NullTicket) {
        res.status(409).json({ error: 'Error on appointment' });
      } else {
        res.status(200).json(ticket);
      }
    } else {
      res.status(404).json(NullTicket);
    }
  };

  public deleteTicket = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const founded = await this.ticketModel.deleteTicket(id);
      founded
        ? res.status(200).json({ message: 'Ticket deleted' })
        : res.status(404).json({ message: 'Ticket not found' });
    } else {
      res.status(404).json(NullTicket);
    }
  };
}
