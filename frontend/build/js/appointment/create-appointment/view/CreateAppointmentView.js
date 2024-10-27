import CreateAppointmentTemplate from '../template/CreateAppointmentTemplate.js';
import Appointment from '../../shared/types/Appointment.js';
import Observer from '../../shared/types/Observer.js';
import UtilAppointment from '../../shared/util/UtilAppointment.js';
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
        div.innerHTML = await CreateAppointmentTemplate.render();
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
            if (!client.getIdentification()) {
                UtilAppointment.showToast('error', 'Error al cargar datos');
                return;
            }
            const newFormContent = await CreateAppointmentTemplate.renderClient(client);
            console.log(client);
            if (client.isNull()) {
                UtilAppointment.showToast('error', 'Cliente no encontrado');
            }
            else {
                UtilAppointment.showToast('success', 'Cliente cargado exitosamente');
            }
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
                UtilAppointment.showToast('success', 'Cita creada exitosamente');
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
                UtilAppointment.showToast('error', 'Cita fallida');
            }
        });
    }
}
