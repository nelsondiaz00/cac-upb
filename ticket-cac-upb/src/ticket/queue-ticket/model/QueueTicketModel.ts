import Appointment from '../../shared/types/Appointment.js';
import Bank from '../../shared/types/Bank.js';
import Client from '../../shared/types/Client.js';
import Environment from '../../shared/types/Environment.js';
import NullBank from '../../shared/types/NullBank.js';
import NullEmployee from '../../shared/types/NullEmployee.js';
import Subject from '../../shared/types/Subject.js';
import Ticket from '../../shared/types/Ticket.js';
import QueueTicketView from '../view/QueueTicketView.js';

export default class QueueTicketModel extends Subject<QueueTicketView> {
  private queueTickets: Ticket[] = [];
  private previousQueue: Ticket[] = [];
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
    this.ticketUpdateStart();
  };

  public ticketUpdateStart(): void {
    // this.previousQueue: Ticket[] = [];

    setInterval(async () => {
      const currentQueue = await this.getQueue();

      if (
        this.hasQueueChanged(this.previousQueue, currentQueue) ||
        currentQueue.length !== this.previousQueue.length
      ) {
        this.queueTickets = currentQueue;
        this.notifyAllObservers();
      }

      this.previousQueue = currentQueue;
    }, 300);
  }

  private hasQueueChanged(
    previousQueue: Ticket[],
    currentQueue: Ticket[]
  ): boolean {
    for (let i = 0; i < currentQueue.length; i++) {
      if (previousQueue[i]?.getTurn() !== currentQueue[i]?.getTurn()) {
        return true;
      }
    }

    return false;
  }

  public getQueueTickets = (): Ticket[] => {
    return this.queueTickets;
  };

  public async getQueue(): Promise<Ticket[]> {
    try {
      const response = await fetch(await Environment.getQueueTickets(), {
        method: 'GET',
      });

      if (!response.ok) {
        // console.log('Error getting tickets');
        return [];
      } else {
        const ticketDataArray = await response.json();

        const tickets = ticketDataArray.map((data: any) =>
          this.mapToClass(data, Ticket)
        );
        // this.actualTicket = tickets[0] || null;

        return tickets;
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public getBankByTicket = async (): Promise<Bank> => {
    try {
      const topTicket = this.previousQueue[0];
      // console.log(
      //   '-------------------------------------------------------------'
      // );
      // console.log('topTicket', topTicket);
      // console.log(this.previousQueue);
      if (this.previousQueue.length <= 0 || topTicket === undefined)
        return new NullBank();
      const response = await fetch(
        await Environment.getBankByTicket(topTicket.getTurn()),
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        return new NullBank();
      } else {
        const bankResponse = await response.json();
        const bank = new Bank(
          bankResponse.id,
          bankResponse.name,
          bankResponse.address,
          new NullEmployee()
        );
        const ticket = this.mapToClass(bankResponse.ticket, Ticket);
        bank.setTicket = ticket;
        return bank;
      }
    } catch (e) {
      console.log(e);
      return new NullBank();
    }
  };

  private mapToClass<T>(data: any, ClassRef: { new (...args: any[]): T }): T {
    const instance = Object.create(ClassRef.prototype);
    Object.assign(instance, data);

    for (const key of Object.keys(instance)) {
      if (typeof instance[key] === 'object' && instance[key] !== null) {
        const SubClass = this.getClassForProperty(ClassRef, key);
        if (SubClass) {
          instance[key] = this.mapToClass(instance[key], SubClass);
        }
      }
    }
    return instance;
  }

  private getClassForProperty(ClassRef: any, propertyName: string): any {
    const map = {
      Ticket: { appointment: Appointment },
      Appointment: { client: Client },
      Client: {},
    };
    return (
      (map[ClassRef.name as keyof typeof map] as any)?.[propertyName] || null
    );
  }
}
