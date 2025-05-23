export default class AppointmentTemplateModal {
    static async renderAppointmentCreated() {
        return `
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <span class="circle-green me-2"></span>
                <strong class="me-auto">Notificación</strong>
                <small>Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                ¡Cita creada exitosamente!
                </div>
            </div>
            </div>`;
    }
    static async renderAppointmentError() {
        return `
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <span class="circle-red me-2"></span>
                <strong class="me-auto">Notificación</strong>
                <small>Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                ¡Error en creación de cita!
                </div>
            </div>
            </div>`;
    }
}
