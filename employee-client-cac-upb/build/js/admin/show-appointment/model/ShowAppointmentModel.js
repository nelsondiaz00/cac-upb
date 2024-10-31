import Appointment from '../../../shared/types/Appointment.js';
import Client from '../../../shared/types/Client.js';
import Environment from '../../../shared/types/Environment.js';
import Subject from '../../../shared/types/Subject.js';
export default class ShowAppointmentModel extends Subject {
    constructor() {
        super();
    }
    init = async () => {
        // console.log('appointment model init');
        this.notifyAllObservers();
    };
    getAllAppointments = async () => {
        try {
            const response = await fetch(await Environment.getAppointments());
            if (!response.ok) {
                return [];
            }
            const responseData = await response.json();
            console.log(responseData);
            const appointments = responseData.map((data) => {
                const client = new Client(data.client.identification, data.client.name, data.client.lastname, data.client.birthday, data.client.address, data.client.premium);
                return new Appointment(data.id, client, data.type, data.date, data.address, data.description, data.notes);
            });
            return appointments;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    };
}
