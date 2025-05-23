import { Request, Response } from 'express';
import NullTicket from '../types/NullTicket';
import TicketModel from '../model/TicketModel';

export default class TicketController {
  constructor(private readonly ticketModel: TicketModel) {}

  public getTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const ticket = await this.ticketModel.getTicketById(id);
      if (ticket.isNull()) {
        res.status(404).json(new NullTicket());
      } else {
        res.status(200).json(ticket);
      }
    } else {
      res.status(404).json(new NullTicket());
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
      if (ticket.isNull()) {
        res.status(409).json({ error: 'Error on appointment' });
      } else {
        res.status(200).json(ticket);
      }
    } else {
      res.status(404).json(new NullTicket());
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
      res.status(404).json(new NullTicket());
    }
  };

  public deactivateTicket = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const founded = await this.ticketModel.deactivateTicket(id);
      founded
        ? res.status(200).json({ message: 'Ticket deactivated' })
        : res.status(404).json({ message: 'Ticket not found' });
    } else {
      res.status(404).json(new NullTicket());
    }
  };

  public getQueue = async (_req: Request, res: Response): Promise<void> => {
    try {
      const queue = await this.ticketModel.getQueue();
      if (queue.length === 0) {
        res.status(404).json({ message: 'Queue is empty' });
      } else {
        res.status(200).json(queue);
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public nextTicket = async (_req: Request, res: Response): Promise<void> => {
    try {
      const ticket = await this.ticketModel.nextTicket();
      if (ticket.isNull()) {
        res.status(404).json({ message: 'Ticket not found' });
      } else {
        res.status(200).json(ticket);
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public peekQueue = async (_req: Request, res: Response): Promise<void> => {
    try {
      const ticket = await this.ticketModel.peekQueue();
      if (ticket.isNull()) {
        res.status(404).json({ message: 'Queue is empty' });
      } else {
        res.status(200).json(ticket);
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
