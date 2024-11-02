import CreateTicketModel from '../model/CreateTicketModel.js';
import Observer from '../../shared/types/Observer.js';
import CreateTicketTemplate from '../template/CreateTicketTemplate.js';
import UtilTicket from '../../shared/util/UtilTicket.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateTicketView extends Observer<CreateTicketModel> {
  private selector: HTMLDivElement;
  private selectorName = 'ticket';

  constructor(subject: CreateTicketModel) {
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
    div.innerHTML = await CreateTicketTemplate.render();
    this.selector.appendChild(div);
    // console.log(this.selector);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
    });
  }

  public addSubmitListeners(): void {
    const ticketSubmit = document.querySelector(
      '#submit-appointment-id'
    ) as HTMLButtonElement;
    // console.log(ticketSubmit);
    ticketSubmit.addEventListener('click', async () => {
      const idAppointment = (
        document.querySelector('#appointment-id') as HTMLInputElement
      ).value;
      // console.log(idAppointment);
      const response = await (
        this.subject as CreateTicketModel
      ).createAppointment(idAppointment);
      if (response != '') {
        console.log(response);
        UtilTicket.showModal(response);
        // UtilAppointment.showToast('success', 'Ticket creado exitosamente');
      } else {
        UtilTicket.showToast('error', 'Error en la creación del ticket');
      }
    });
  }
}
