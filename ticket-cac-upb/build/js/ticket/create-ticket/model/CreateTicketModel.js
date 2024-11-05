import Environment from '../../shared/types/Environment.js';
import Subject from '../../shared/types/Subject.js';
export default class CreateTicketModel extends Subject {
    constructor() {
        super();
    }
    init = async () => {
        // console.log('appointment model init');
        this.notifyAllObservers();
    };
    createTicket = async (idAppointment) => {
        console.log(idAppointment);
        const response = await fetch(await Environment.createTicket(idAppointment), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log(response.status);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.turn;
        }
        else {
            console.log('Error creating appointment');
            return '';
        }
    };
}
