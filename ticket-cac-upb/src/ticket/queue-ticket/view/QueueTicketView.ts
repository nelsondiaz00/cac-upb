import QueueTicketModel from '../model/QueueTicketModel.js';
import Observer from '../../shared/types/Observer.js';
import QueueTicketTemplate from '../template/QueueTicketTemplate.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class QueueTicketView extends Observer<QueueTicketModel> {
  private selector: HTMLDivElement;
  private selectorName = 'ticket';

  constructor(subject: QueueTicketModel) {
    super(subject);
    this.selector = document.createElement('div');
  }

  public init(): void {
    // console.log('appointment view init');
    this.selector = document.querySelector(this.selectorName) as HTMLDivElement;
    // console.log(this.selector);
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    // console.log('rendering create ticket');
    this.selector.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'ticket';
    const tickets = await (this.subject as QueueTicketModel).getQueueTickets();
    div.innerHTML = await QueueTicketTemplate.render(tickets);
    this.selector.appendChild(div);
    // console.log(this.selector);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
    });
  }

  public addSubmitListeners(): void {
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
