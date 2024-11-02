import Observer from '../../shared/types/Observer.js';
import QueueTicketTemplate from '../template/QueueTicketTemplate.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class QueueTicketView extends Observer {
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
        const tickets = await this.subject.getQueueTickets();
        div.innerHTML = await QueueTicketTemplate.render(tickets);
        this.selector.appendChild(div);
        // console.log(this.selector);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
        });
    }
    addSubmitListeners() {
        // const ticketSubmit = document.querySelector(
        //   '#submit-appointment-id'
        // ) as HTMLButtonElement;
        // // console.log(ticketSubmit);
        // ticketSubmit.addEventListener('click', async () => {
        //   const ticket = (
        //     document.querySelector('#appointment-id') as HTMLInputElement
        //   ).value;
        //   console.log(idAppointment);
        //   const response = await (
        //     this.subject as QueueTicketModel
        //   ).createAppointment(idAppointment);
        //   if (response != '') {
        //     console.log(response);
        //     UtilAppointment.showModal(response);
        //     // UtilAppointment.showToast('success', 'Ticket creado exitosamente');
        //   } else {
        //     UtilAppointment.showToast('error', 'Error en la creación del ticket');
        //   }
        // });
    }
}
