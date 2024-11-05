import Appointment from '../../shared/types/Appointment.js';
import Client from '../../shared/types/Client.js';
import Environment from '../../shared/types/Environment.js';
import Subject from '../../shared/types/Subject.js';
import NullTicket from '../types/NullTicket.js';
import Ticket from '../types/Ticket.js';
import BankAttendView from '../view/BankAttendView.js';

export default class BankAttendModel extends Subject<BankAttendView> {
  private actualTicket: Ticket;
  private inAttend: boolean;
  constructor() {
    super();
    this.actualTicket = new NullTicket();
    this.inAttend = false;
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.startTicketUpdate();
    this.notifyAllObservers();
  };

  public async startTicketUpdate(): Promise<void> {
    setInterval(async () => {
      const nextTicket = await this.peekQueue();
      if (
        this.actualTicket.isNull() ||
        (nextTicket.getTurn() !== this.actualTicket.getTurn() && !this.inAttend)
      ) {
        this.actualTicket = nextTicket;
        this.notifyAllObservers();
      }
    }, 250);
  }

  getActualTicket = (): Ticket => {
    return this.actualTicket;
  };

  public async peekQueue(): Promise<Ticket> {
    const response = await fetch(await Environment.peekQueue(), {
      method: 'GET',
    });

    if (!response.ok) {
      console.log('Error getting ticket');
      return new NullTicket();
    } else {
      const ticketData = await response.json();
      const ticket = this.mapToClass(ticketData, Ticket);
      // this.actualTicket = ticket;
      return ticket;
    }
  }

  public async finishTurn(notes: string): Promise<boolean> {
    this.actualTicket.getAppointment().setNotes(notes);
    try {
      const info = {
        id: this.actualTicket.getAppointment().getId(),
        client_identification: this.actualTicket
          .getAppointment()
          .getClient()
          .getIdentification(),
        type: this.actualTicket.getAppointment().getType(),
        date: this.actualTicket.getAppointment().getDate(),
        address: this.actualTicket.getAppointment().getAddress(),
        description: this.actualTicket.getAppointment().getDescription(),
        notes: this.actualTicket.getAppointment().getNotes(),
      };
      const responseAppointment = await fetch(
        await Environment.updateAppointment(),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        }
      );
      if (responseAppointment.ok) {
        console.log('se volvió nulo');
        this.inAttend = false;
        this.actualTicket = new NullTicket();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async nextQueueTicket(): Promise<boolean> {
    try {
      const result = await this.updateBank();
      console.log('result: ', result);
      if (!result) {
        console.log('Error updating bank');
        return false;
      } else {
        const responseTicket = await fetch(await Environment.nextTicket(), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (responseTicket.ok) {
          this.inAttend = true;
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async updateBank(): Promise<boolean> {
    try {
      const employeeData = localStorage.getItem('employee');
      const parsedUser = employeeData ? JSON.parse(employeeData) : null;
      const data = {
        idTicket: this.actualTicket.getTurn(),
        idEmployee: parsedUser.identification,
      };
      console.log(data);
      const responseBank = await fetch(await Environment.updateBank(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (responseBank.ok) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

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
