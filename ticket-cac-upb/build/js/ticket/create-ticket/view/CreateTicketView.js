import Observer from '../../shared/types/Observer.js';
import CreateTicketTemplate from '../template/CreateTicketTemplate.js';
import UtilTicket from '../../shared/util/UtilTicket.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateTicketView extends Observer {
    selector;
    selectorName = 'ticket';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        // console.log('appointment view init');
        this.selector = document.querySelector(this.selectorName);
        // console.log(this.selector);
        this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        // console.log('rendering create ticket');
        this.selector.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'ticket';
        div.innerHTML = await CreateTicketTemplate.render();
        this.selector.appendChild(div);
        // console.log(this.selector);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
        });
    }
    addSubmitListeners() {
        const ticketSubmit = document.querySelector('#submit-appointment-id');
        // console.log(ticketSubmit);
        ticketSubmit.addEventListener('click', async () => {
            const idAppointment = document.querySelector('#appointment-id');
            // console.log(idAppointment);
            const response = await this.subject.createTicket(idAppointment.value);
            if (response != '') {
                console.log(response);
                UtilTicket.showModal(response);
                idAppointment.value = '';
                // UtilAppointment.showToast('success', 'Ticket creado exitosamente');
            }
            else {
                UtilTicket.showToast('error', 'Error en la creación del ticket');
            }
        });
    }
}
