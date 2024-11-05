import Bank from '../../shared/types/Bank.js';
import Ticket from '../../shared/types/Ticket.js';
import UtilTicket from '../../shared/util/UtilTicket.js';

export default class QueueTicketTemplate {
  public static async render(tickets: Ticket[]): Promise<string> {
    const content =
      tickets.length === 0
        ? '<h3 style="text-align: center;">Cola vacía</h3>'
        : tickets
            .map(
              (ticket, index) => `
          <button type="button" class="btn ${
            index === 0 ? 'btn-danger' : 'btn-light'
          } w-100 mb-3 p-3" data-id="${ticket.getTurn()}">
            ${ticket.getTurn()}
          </button>
        `
            )
            .join('');
    const firstTicketTurn = tickets.length > 0 ? tickets[0]?.getTurn() : 'N/A';

    // const bankContent = bank
    //   ? `
    //   <div class="queue-component p-3 text-bg-warning rounded-3">
    //       <h3 style="text-align: center; margin: 0;">Turno en cola: ${firstTicketTurn}</h3>
    //       <h3 style="text-align: center; margin: 0;">Banco: Espere</h3>
    //     </div>

    // `
    //   : `
    //     <div class="queue-component p-3 text-bg-warning rounded-3">
    //       <h3 style="text-align: center; margin: 0;">Turno en cola: ${firstTicketTurn}</h3>
    //       <h3 style="text-align: center; margin: 0;">Banco: Espere</h3>
    //     </div>
    //       `;

    const html = ` 
    <div class="name-module">
      <h3>COLA DE TICKETS</h3>
    </div>
    
    <div class="queue-main-container">
      <div class="announcement-queue-container" style="margin-right: 5%;">
        <div class="queue-component p-3 text-bg-warning rounded-3 mb-3">
          <h3 style="text-align: center; margin: 0;">Turno en cola: ${firstTicketTurn}</h3>
          <h3 style="text-align: center; margin: 0;">Banco: Espere</h3>
        </div>
      </div>

      <div class="m-auto queue-container">
        ${content}
      </div>
    </div>
    `;

    setTimeout(() => {
      document.querySelectorAll('.queue-container button').forEach((button) => {
        button.addEventListener('click', (event) => {
          const target = event.target as HTMLButtonElement;
          const ticketId = target.getAttribute('data-id');
          const ticket = tickets.find((t) => t.getTurn() === ticketId);
          if (ticket) {
            UtilTicket.showTicketModal(ticket);
          } else {
            console.log('Ticket no encontrado');
          }
        });
      });
    }, 0);

    return html;
  }

  public static async renderBankAnnouncement(bank: Bank): Promise<string> {
    return `
    <div class="queue-component p-3 text-bg-warning rounded-3">
        <h3 style="text-align: center; margin: 0;">Turno atendido: ${bank.getTicket.getTurn()}</h3>
        <h3 style="text-align: center; margin: 0;">Banco: ${bank.getName}</h3>
      </div>`;
  }
}
