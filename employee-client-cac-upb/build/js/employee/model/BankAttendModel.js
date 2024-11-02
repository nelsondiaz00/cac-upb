import Appointment from '../../shared/types/Appointment.js';
import Client from '../../shared/types/Client.js';
import Environment from '../../shared/types/Environment.js';
import Subject from '../../shared/types/Subject.js';
import NullTicket from '../types/NullTicket.js';
import Ticket from '../types/Ticket.js';
export default class BankAttendModel extends Subject {
    actualTicket;
    constructor() {
        super();
        this.actualTicket = new NullTicket();
    }
    init = async () => {
        // console.log('appointment model init');
        this.startTicketUpdate();
        this.notifyAllObservers();
    };
    async startTicketUpdate() {
        // this.actualTicket = await this.peekQueue();
        // this.notifyAllObservers();
        setInterval(async () => {
            // console.log('updating ticket');
            if (this.actualTicket.isNull()) {
                console.log(this.actualTicket);
                this.actualTicket = await this.peekQueue();
                this.notifyAllObservers();
            }
        }, 250);
    }
    getActualTicket = () => {
        return this.actualTicket;
    };
    async peekQueue() {
        const response = await fetch(await Environment.peekQueue(), {
            method: 'GET',
        });
        if (!response.ok) {
            console.log('Error getting ticket');
            return new NullTicket();
        }
        else {
            const ticketData = await response.json();
            const ticket = this.mapToClass(ticketData, Ticket);
            // this.actualTicket = ticket;
            return ticket;
        }
    }
    async finishTurn(notes) {
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
            const responseAppointment = await fetch(await Environment.updateAppointment(), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            if (responseAppointment.ok) {
                console.log('se volvió nulo');
                this.actualTicket = new NullTicket();
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async attendTicket() {
        try {
            const responseTicket = await fetch(await Environment.nextTicket(), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (responseTicket.ok) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    mapToClass(data, ClassRef) {
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
    getClassForProperty(ClassRef, propertyName) {
        const map = {
            Ticket: { appointment: Appointment },
            Appointment: { client: Client },
            Client: {},
        };
        return (map[ClassRef.name]?.[propertyName] || null);
    }
}
