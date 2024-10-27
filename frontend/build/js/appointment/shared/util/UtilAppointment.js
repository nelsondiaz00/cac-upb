import AppointmentTemplateModal from '../template/AppointmentTemplateModal.js';
export default class UtilAppointment {
    static async showToast(modalType, messageModal) {
        let toastHTML = '';
        if (modalType === 'success') {
            console.log('success');
            toastHTML = await AppointmentTemplateModal.renderSuccessful(messageModal);
        }
        else {
            console.log('error');
            toastHTML = await AppointmentTemplateModal.renderError(messageModal);
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
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
        else {
            console.error('Toast element not found');
        }
    }
}
