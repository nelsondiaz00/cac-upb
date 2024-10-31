import UpdateAppointmentTemplate from '../template/UpdateAppointmentTemplate.js';
import Appointment from '../../shared/types/Appointment.js';
// import AppointmentTemplateModal from '../template/AppointmentTemplateModal.js';
// import Appointment from '../types/Appointment.js';
import Observer from '../../shared/types/Observer.js';
import UtilAppointment from '../../shared/util/UtilAppointment.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class UpdateAppointmentView extends Observer {
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
        div.innerHTML = await UpdateAppointmentTemplate.render();
        this.selector.appendChild(div);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
            this.addAppointmentListener();
            console.log('addSubmitListeners');
        });
    }
    addAppointmentListener() {
        const idAppointment = document.querySelector('#appointment_id');
        const submitIdentificationAppointment = document.querySelector('#submit-appointment-id');
        submitIdentificationAppointment.addEventListener('click', async () => {
            console.log('submitIdentificationAppointment');
            const info_appointment = document.querySelector('#components-container');
            const appointment = await this.subject.getAppointmentById(idAppointment.value);
            console.log(appointment.isNull(), ' app');
            if (appointment.isNull()) {
                UtilAppointment.showToast('error', 'Cita no encontrada');
                return;
            }
            else {
                UtilAppointment.showToast('success', 'Cita cargada exitosamente');
            }
            console.log(appointment);
            const newFormContent = await UpdateAppointmentTemplate.renderAppointment(appointment);
            if (info_appointment) {
                info_appointment.innerHTML = newFormContent;
                this.addSubmitListeners();
            }
        });
    }
    addSubmitListeners() {
        console.log('demás submits');
        const idAppointment = document.querySelector('#appointment_id');
        const identificationUser = document.querySelector('#user_identification');
        const submitIdentificationUser = document.querySelector('#submit-identification-user');
        //  console.log(submitIdentificationUser);
        submitIdentificationUser.addEventListener('click', async () => {
            console.log('click');
            const form_user = document.querySelector('#form_user');
            const client = await this.subject.getUserByIdentification(identificationUser.value);
            if (!client.getIdentification()) {
                UtilAppointment.showToast('error', 'Espacio de identificación vacío');
                return;
            }
            const newFormContent = await UpdateAppointmentTemplate.renderClient(client);
            console.log(client);
            if (client.isNull()) {
                UtilAppointment.showToast('error', 'Cliente no encontrado');
            }
            else {
                UtilAppointment.showToast('success', 'Cliente cargado exitosamente');
            }
            console.log(form_user);
            if (form_user) {
                form_user.innerHTML = newFormContent;
            }
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
            if (!client.getIdentification()) {
                UtilAppointment.showToast('error', 'Error en creación de cita');
                return;
            }
            const combinedDateTime = new Date(`${appointmentDate.value}T${appointmentHour.value}:00`);
            const newAppointment = new Appointment(idAppointment.value, client, appointmentType.value, combinedDateTime, appointmentAddress.value, appointmentDescription.value, '');
            const response = await this.subject.updateAppointment(newAppointment);
            if (response) {
                UtilAppointment.showToast('success', 'Cita actualizada exitosamente');
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
                idAppointment.value = '';
                userIdentification.value = '';
                userName.value = '';
                userLastName.value = '';
                userAddress.value = '';
                userBirthday.value = '';
            }
            else {
                UtilAppointment.showToast('error', 'Actualización de cita fallida');
            }
        });
        const deleteAppointment = document.querySelector('#delete-appointment');
        deleteAppointment.addEventListener('click', async () => {
            const response = await this.subject.deleteAppointment(idAppointment.value);
            if (response) {
                UtilAppointment.showToast('success', 'Cita eliminada exitosamente');
                idAppointment.value = '';
                const userIdentification = document.querySelector('#user_identification');
                const userName = document.querySelector('#user_name');
                const userLastName = document.querySelector('#user_last_name');
                const userAddress = document.querySelector('#user_address');
                const userBirthday = document.querySelector('#user_birthday');
                idAppointment.value = '';
                userIdentification.value = '';
                userName.value = '';
                userLastName.value = '';
                userAddress.value = '';
                userBirthday.value = '';
                const appointmentType = document.querySelector('#appointment_type');
                const appointmentDescription = document.querySelector('#appointment_description');
                const appointmentDate = document.querySelector('#appointment_date');
                const appointmentHour = document.querySelector('#appointment_hour');
                const appointmentAddress = document.querySelector('#appointment_address');
                appointmentType.value = '';
                appointmentDescription.value = '';
                appointmentDate.value = '';
                appointmentHour.value = '08:00';
                appointmentAddress.value = '';
            }
            else {
                UtilAppointment.showToast('error', 'Eliminación de cita fallida');
            }
        });
    }
}
