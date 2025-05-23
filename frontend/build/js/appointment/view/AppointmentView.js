import AppointmentTemplate from '../template/AppointmentTemplate.js';
import AppointmentTemplateModal from '../template/AppointmentTemplateModal.js';
import Appointment from '../types/Appointment.js';
import Observer from '../types/Observer.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateAppointmentView extends Observer {
    selector;
    selectorName = 'appointment';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        // console.log('appointment view init');
        this.selector = document.querySelector(this.selectorName);
        this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.selector.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'appointment';
        div.innerHTML = await AppointmentTemplate.render();
        this.selector.appendChild(div);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
            // const submitIdentification = document.querySelector(
            //   '#submit-identification-user'
            // ) as HTMLButtonElement;
            // console.log(submitIdentification);
        });
    }
    addSubmitListeners() {
        const identificationUser = document.querySelector('#user_identification_get');
        const submitIdentification = document.querySelector('#submit-identification-user');
        submitIdentification.addEventListener('click', async () => {
            const form_user = document.querySelector('#form_user');
            const client = await this.subject.getUserByIdentification(identificationUser.value);
            const newFormContent = await AppointmentTemplate.renderClient(client);
            if (form_user) {
                form_user.innerHTML = newFormContent;
            }
            console.log(client);
        });
        const submitAppointment = document.querySelector('#submit-appointment');
        submitAppointment.addEventListener('click', async () => {
            // const form_user = document.querySelector('#form_user') as HTMLFormElement;
            const appointmentType = document.querySelector('#appointment_type');
            const appointmentDescription = document.querySelector('#appointment_description');
            const appointmentDate = document.querySelector('#appointment_date');
            const appointmentHour = document.querySelector('#appointment_hour');
            const appointmentAddress = document.querySelector('#appointment_address');
            const client = await this.subject.getUserByIdentification(identificationUser.value);
            if (!client) {
                console.error('No se encontró el cliente');
                return;
            }
            const combinedDateTime = new Date(`${appointmentDate.value}T${appointmentHour.value}:00`);
            const newAppointment = new Appointment('0', client, appointmentType.value, combinedDateTime, appointmentAddress.value, appointmentDescription.value);
            const response = await this.subject.createAppointment(newAppointment);
            if (response) {
                const toastHTML = await AppointmentTemplateModal.renderAppointmentCreated();
                this.showToast(toastHTML);
                appointmentType.value = '';
                appointmentDescription.value = '';
                appointmentDate.value = '';
                appointmentHour.value = '08:00';
                appointmentAddress.value = '';
                const userIdentification = document.querySelector('#user_identification');
                const userName = document.querySelector('#user_name');
                const userLastName = document.querySelector('#user_last_name');
                const userAddress = document.querySelector('#user_address');
                const userBirthday = document.querySelector('#user_birthday');
                const userIdentificationGet = document.querySelector('#user_identification_get');
                userIdentificationGet.value = '';
                userIdentification.value = '';
                userName.value = '';
                userLastName.value = '';
                userAddress.value = '';
                userBirthday.value = '';
            }
            else {
                const toastHTML = await AppointmentTemplateModal.renderAppointmentError();
                this.showToast(toastHTML);
            }
        });
    }
    showToast(toastHTML) {
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
