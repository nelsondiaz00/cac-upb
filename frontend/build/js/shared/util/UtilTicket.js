import BootstrapTemplateModal from '../../appointment/shared/template/BootstrapTemplateModal.js';
export default class UtilTicket {
    static async showModal(message) {
        let modalElement = document.getElementById('modal-ticket');
        if (!modalElement) {
            const modalHTML = await BootstrapTemplateModal.renderModal(message);
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modalElement = document.getElementById('modal-ticket');
        }
        else {
            const newModalHTML = await BootstrapTemplateModal.renderModal(message);
            modalElement.outerHTML = newModalHTML; // Reemplazar el modal existente
            modalElement = document.getElementById('modal-ticket');
        }
        if (modalElement) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    }
}
