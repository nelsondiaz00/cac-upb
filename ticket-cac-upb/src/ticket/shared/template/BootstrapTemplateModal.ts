import Ticket from '../types/Ticket';

export default class BootstrapTemplateModal {
  public static async renderModal(message: string): Promise<string> {
    return `
      <div class="modal" tabindex="-1" id="modal-ticket">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Ticket creado exitosamente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Tu turno de ticket es: <strong>${message}</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  public static async renderTicket(ticket: Ticket): Promise<string> {
    return `
<div class="modal" tabindex="-1" id="modal-ticket">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ticket con turno: <strong>${ticket.getTurn()} </strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p><strong>Fecha de vigencia: </strong>${ticket
          .getAppointment()
          .getDate()}</p>
        <p><strong>Cédula: </strong>${ticket
          .getAppointment()
          .getClient()
          .getIdentification()}</p>
        <p><strong>Nombre: </strong>${ticket
          .getAppointment()
          .getClient()
          .getName()}</p>
        <p><strong>Apellido: </strong>${ticket
          .getAppointment()
          .getClient()
          .getLastname()}</p>
        <p><strong>Fecha de nacimiento: </strong>${ticket
          .getAppointment()
          .getClient()
          .getBirthday()}</p>
        <p><strong>Dirección: </strong>${ticket
          .getAppointment()
          .getClient()
          .getAddress()}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>`;
  }
}
