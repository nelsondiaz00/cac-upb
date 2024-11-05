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
    // this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    this.selector.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'ticket';
    const bank = await (this.subject as QueueTicketModel).getBankByTicket();
    const tickets = await (this.subject as QueueTicketModel).getQueueTickets();

    //  console.log('banco', bank);
    div.innerHTML = await QueueTicketTemplate.render(tickets);
    this.selector.appendChild(div);

    if (!bank.isNull()) {
      const bankTemplate = await QueueTicketTemplate.renderBankAnnouncement(
        bank
      );
      const announcementContainer = document.querySelector(
        '.announcement-queue-container'
      ) as HTMLElement;
      console.log('announcementContainer', announcementContainer);
      if (announcementContainer) {
        const announcement = document.createElement('div');
        announcement.className =
          'queue-component p-3 text-bg-warning rounded-3 mb-3';
        console.log('añadiendo bank');
        announcement.innerHTML = bankTemplate;
        announcementContainer.appendChild(announcement);
        setTimeout(() => {
          announcement.remove();
        }, 10000);
      }
    }
  }

  // public addListeners(): void {
  //   window.addEventListener('DOMContentLoaded', () => {
  //     this.addSubmitListeners();
  //   });
  // }

  // public addSubmitListeners(): void {

  // }
}
