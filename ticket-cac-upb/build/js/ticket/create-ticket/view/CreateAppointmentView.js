import Observer from '../../shared/types/Observer.js';
import CreateTicketTemplate from '../template/CreateTicketTemplate.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateTicketView extends Observer {
    selector;
    selectorName = 'appointment';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        // console.log('appointment view init');
        this.selector = document.querySelector(this.selectorName);
        this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.selector.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'appointment';
        div.innerHTML = CreateTicketTemplate.render();
        this.selector.appendChild(div);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
        });
    }
    addSubmitListeners() {
        const ticketSubmit = document.querySelector('#appointment_id');
        ticketSubmit.addEventListener('click', async () => {
            const idAppointment = document.querySelector('#appointment_id').value;
            console.log(idAppointment);
            const response = await this.subject.createAppointment(idAppointment);
            if (response) {
                console.log('Appointment created');
            }
            else {
                console.log('Error creating appointment');
            }
        });
    }
}
