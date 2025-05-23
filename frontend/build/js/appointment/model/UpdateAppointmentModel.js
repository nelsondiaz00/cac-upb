import Client from '../../client/types/Client.js';
import Environment from '../../shared/Environment.js';
import NullPerson from '../../shared/NullPerson.js';
// import NullPerson from '../../shared/NullPerson.js';
import Appointment from '../types/Appointment.js';
import NullAppointment from '../types/NullAppointment.js';
import Subject from '../types/Subject.js';
export default class UpdateAppointmentModel extends Subject {
    constructor() {
        super();
    }
    init = async () => {
        // console.log('appointment model init');
        this.notifyAllObservers();
    };
    getAppointmentById = async (id) => {
        const response = await fetch(await Environment.getAppointmentById(id));
        if (response.status !== 200) {
            return new NullAppointment();
        }
        const responseData = await response.json();
        const client = new Client(responseData.client.identification, responseData.client.name, responseData.client.lastname, responseData.client.birthday, responseData.client.address);
        const appointment = new Appointment(responseData.id, client, responseData.type, responseData.date, responseData.address, responseData.description);
        return appointment;
    };
    getUserByIdentification = async (id) => {
        const response = await fetch(await Environment.getClientByIdentification(id));
        if (response.status !== 200) {
            return new NullPerson();
        }
        const responseData = await response.json();
        const client = new Client(responseData.identification, responseData.name, responseData.lastname, responseData.birthday, responseData.address);
        return client;
    };
    updateAppointment = async (appointment) => {
        console.log(appointment);
        const info = {
            id: appointment.getId(),
            client_identification: appointment.getClient().getIdentification(),
            type: appointment.getType(),
            date: appointment.getDate(),
            address: appointment.getAddress(),
            description: appointment.getDescription(),
        };
        console.log(info);
        const response = await fetch(await Environment.updateAppointment(), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });
        const errorData = await response.json();
        console.log(errorData);
        if (response.status !== 200) {
            console.log('Error updating appointment');
            return false;
        }
        else {
            console.log('Appointment updated');
            return true;
        }
    };
}
