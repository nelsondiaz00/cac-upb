import { Request, Response } from 'express';
import ITicketControllerExpress from '../../../../domain/port/driver/ticket/ITicketControllerExpress';
import ITicketUseCase from '../../../../domain/port/driver/ticket/ITicketUseCase';

export default class TicketControllerExpress
  implements ITicketControllerExpress
{
  constructor(private readonly ticketUseCase: ITicketUseCase) {}
  async readTickets(_req: Request, res: Response): Promise<void> {
    try {
      const tickets = await this.ticketUseCase.getTickets();
      if (tickets) {
        res.status(200).json(tickets);
      } else {
        res.status(404).json({ message: 'Tickets not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async readTicketById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ message: 'Bad id' });
        return;
      }
      const ticket = await this.ticketUseCase.getTicketById(id);
      if (ticket) {
        if (ticket.isNull()) {
          res.status(404).json({ message: 'Ticket not found' });
          return;
        }
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async createTicket(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id === undefined) {
        res.status(400).json({ message: 'Ticket could not be created' });
        return;
      }
      const result = await this.ticketUseCase.createTicket(id);
      if (result) {
        res.status(201).json(result);
      } else {
        res.status(400).json({ message: 'Ticket could not be created' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async deactivateTicket(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id === undefined) {
        res.status(400).json({ message: 'Ticket could not be deactivated' });
        return;
      }
      const result = await this.ticketUseCase.deactivateTicket(id);
      if (result) {
        res.status(201).json({ message: 'Ticket deactivated' });
      } else {
        res.status(400).json({ message: 'Ticket could not be deactivated' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async deleteTicket(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id) {
        const result = await this.ticketUseCase.deleteTicket(id);
        if (result) {
          res.status(200).json({ message: 'Ticket deleted' });
        } else {
          res.status(400).json({ error: 'Failed to delete ticket' });
        }
      } else {
        res.status(400).json({ error: 'ID vacío' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server internal error' });
    }
  }
  async readQueue(_req: Request, res: Response): Promise<void> {
    try {
      const queueTickets = await this.ticketUseCase.getQueueTickets();
      // console.log(appointments);
      if (queueTickets) {
        res.status(200).json(queueTickets);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async nextPositionQueue(_req: Request, res: Response): Promise<void> {
    try {
      const ticket = await this.ticketUseCase.nextQueue();
      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async peekQueue(_req: Request, res: Response): Promise<void> {
    try {
      const ticket = await this.ticketUseCase.peekQueue();
      if (ticket) {
        if (ticket.isNull()) {
          res.status(404).json({ message: 'Ticket not found' });
          return;
        }
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
}
