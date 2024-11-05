export default class BootstrapTemplateModal {
    static async renderModal(message) {
        return `
      <div class="modal" tabindex="-1" id="modal-ticket">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cita creada exitosamente</h5>
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
}
