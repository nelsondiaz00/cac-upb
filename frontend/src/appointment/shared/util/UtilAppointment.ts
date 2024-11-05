import BootstrapTemplateModal from '../template/BootstrapTemplateModal.js';
import BootstrapTemplateToasts from '../template/BootstrapTemplateToasts.js';

export default class UtilAppointment {
  public static async showToast(
    modalType: string,
    messageModal: string
  ): Promise<void> {
    let toastHTML = '';
    if (modalType === 'success') {
      console.log('success');
      toastHTML = await BootstrapTemplateToasts.renderSuccessful(messageModal);
    } else {
      console.log('error');
      toastHTML = await BootstrapTemplateToasts.renderError(messageModal);
    }

    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className =
        'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    toastContainer.innerHTML = toastHTML;

    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    } else {
      console.error('Toast element not found');
    }
  }

  public static async showModal(message: string) {
    let modalElement = document.getElementById('modal-ticket');

    if (!modalElement) {
      const modalHTML = await BootstrapTemplateModal.renderModal(message);
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      modalElement = document.getElementById('modal-ticket');
    } else {
      const newModalHTML = await BootstrapTemplateModal.renderModal(message);
      modalElement.outerHTML = newModalHTML; // Reemplazar el modal existente
      modalElement = document.getElementById('modal-ticket');
    }

    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
