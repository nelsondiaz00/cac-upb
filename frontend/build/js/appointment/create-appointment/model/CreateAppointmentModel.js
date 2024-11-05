import Client from '../../../client/types/Client.js';
import NullClient from '../../../client/types/NullClient.js';
import Environment from '../../../shared/types/Environment.js';
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
        const appointmentClientData = {
            client_identification: appointment.getClient().getIdentification(),
            type: appointment.getType(),
            date: appointment.getDate().toString(),
            address: appointment.getAddress(),
            description: appointment.getDescription(),
            notes: appointment.getNotes(),
        };
        const response = await fetch(await Environment.createAppointment(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentClientData),
        });
        // const errorData = await response.json();
        if (response.status !== 201) {
            console.log('Error creating appointment');
            return '';
        }
        else {
            const data = await response.json();
            return data.message;
            console.log('Appointment created');
            return data;
        }
    };
}
