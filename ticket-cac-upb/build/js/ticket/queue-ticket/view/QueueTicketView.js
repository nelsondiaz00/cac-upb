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
        // this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.selector.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'ticket';
        const bank = await this.subject.getBankByTicket();
        const tickets = await this.subject.getQueueTickets();
        //  console.log('banco', bank);
        div.innerHTML = await QueueTicketTemplate.render(tickets);
        this.selector.appendChild(div);
        if (!bank.isNull()) {
            const bankTemplate = await QueueTicketTemplate.renderBankAnnouncement(bank);
            const announcementContainer = document.querySelector('.announcement-queue-container');
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
}
