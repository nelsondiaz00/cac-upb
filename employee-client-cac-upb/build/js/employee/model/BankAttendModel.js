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
        this.notifyAllObservers();
    };
    createEmployee = async (employee) => {
        const response = await fetch(await Environment.createEmployee(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: employee.getName(),
                lastname: employee.getLastname(),
                identification: employee.getIdentification(),
                birthday: employee.getBirthday().toISOString(),
                address: employee.getAddress(),
                email: employee.getEmail(),
                password: employee.getPassword(),
                role: employee.getRole(),
            }),
        });
        // const errorData = await response.json();
        if (!response.ok) {
            console.log('Error creating appointment');
            return false;
        }
        else {
            console.log('Appointment created');
            return true;
        }
    };
    async getTicketById(turn) {
        const response = await fetch(await Environment.getTicketById(turn), {
            method: 'GET',
        });
        if (!response.ok) {
            console.log('Error getting ticket');
            return new NullTicket();
        }
        else {
            const ticketData = await response.json();
            const ticket = this.mapToClass(ticketData, Ticket);
            this.actualTicket = ticket;
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
            console.log(info);
            const responseAppointment = await fetch(await Environment.updateAppointment(), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            const responseTicket = await fetch(await Environment.deactivateTicket(this.actualTicket.getTurn()), {
                method: 'PATCH',
            });
            if (responseAppointment.ok && responseTicket.ok) {
                return true;
                this.actualTicket = new NullTicket();
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
