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
    createAppointment = async (idAppointment) => {
        console.log(idAppointment);
        const response = await fetch(await Environment.createTicket(idAppointment), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // const errorData = await response.json();
        if (response.status !== 201) {
            console.log('Error creating appointment');
            return false;
        }
        else {
            console.log('Appointment created');
            return true;
        }
    };
}
