export default class AppointmentTemplateModal {
  public static async renderSuccessful(message: string): Promise<string> {
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
                ${message || '¡Proceso exitoso!'} 
                </div>
            </div>
            </div>`;
  }

  public static async renderError(message: string): Promise<string> {
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
                ${message || '¡Proceso fallido!'} 
                </div>
            </div>
            </div>`;
  }
}
