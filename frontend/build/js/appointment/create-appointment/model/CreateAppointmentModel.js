import Client from '../../../client/types/Client.js';
import NullClient from '../../../client/types/NullClient.js';
import Environment from '../../../shared/Environment.js';
import Subject from '../../shared/types/Subject.js';
export default class CreateAppointmentModel extends Subject {
    constructor() {
        super();
    }
    init = async () => {
        // console.log('appointment model init');
        this.notifyAllObservers();
    };
    getUserByIdentification = async (id) => {
        const response = await fetch(await Environment.getClientByIdentification(id));
        if (response.status !== 200) {
            return new NullClient();
        }
        try {
            const responseData = await response.json();
            const client = new Client(responseData.identification, responseData.name, responseData.lastname, responseData.birthday, responseData.address, responseData.premium);
            return client;
        }
        catch (e) {
            console.log('acá');
            return new NullClient();
        }
    };
    createAppointment = async (appointment) => {
        console.log(appointment);
        const response = await fetch(await Environment.createAppointment(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment,
            }),
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
