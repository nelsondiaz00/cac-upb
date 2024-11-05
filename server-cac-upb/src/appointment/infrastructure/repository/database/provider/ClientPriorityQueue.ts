import NullTicket from '../../../../domain/model/ticket/NullTicket';
import Ticket from '../../../../domain/model/ticket/Ticket';

export default class ClientPriorityQueue {
  private static queue: Ticket[] = [];

  public static enqueue(ticket: Ticket): void {
    if (
      this.queue.find((ticketList) => ticketList.getTurn() === ticket.getTurn())
    )
      return;
    this.queue.push(ticket);
    this.queue.sort(this.compare);
  }

  public static dequeue(): Ticket {
    const ticket = this.queue.shift();
    return ticket ? ticket : new NullTicket();
  }

  public static peek(): Ticket {
    const ticket = this.queue[0];
    return ticket ? ticket : new NullTicket();
  }

  private static compare(a: Ticket, b: Ticket): number {
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

  public static getAllTickets(): Ticket[] {
    return this.queue;
  }
}
