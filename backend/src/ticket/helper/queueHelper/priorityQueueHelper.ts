import NullTicket from '../../types/NullTicket';
import Ticket from '../../types/Ticket';

export default class ClientPriorityQueue {
  private queue: Ticket[] = [];

  public enqueue(ticket: Ticket): void {
    this.queue.push(ticket);
    this.queue.sort(this.compare.bind(this));
  }

  public dequeue(): Ticket {
    const ticket = this.queue.shift();
    return ticket ? ticket : new NullTicket();
  }

  public peek(): Ticket {
    const ticket = this.queue[0];
    return ticket ? ticket : new NullTicket();
  }

  private compare(a: Ticket, b: Ticket): number {
    const clientA = a.getAppointment().getClient();
    const clientB = b.getAppointment().getClient();

    if (clientA.isPremium() && !clientB.isPremium()) return -1;
    if (!clientA.isPremium() && clientB.isPremium()) return 1;

    const ageA = clientA.getAge();
    const ageB = clientB.getAge();

    if (ageA > 60 && ageB <= 60) return -1;
    if (ageA <= 60 && ageB > 60) return 1;

    return 0;
  }

  public getAllTickets(): Ticket[] {
    return this.queue;
  }
}
