import BankAttendTemplate from '../template/BankAttendTemplate.js';
import Observer from '../../shared/types/Observer.js';
// import BootstrapTemplateToasts from '../../admin/shared/template/BootstrapTemplateToats.js';
import UtilBoostrap from '../../admin/shared/util/UtilBootstrap.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class BankAttendView extends Observer {
    selector;
    selectorName = 'employee';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
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
        div.innerHTML = await BankAttendTemplate.render();
        this.selector.appendChild(div);
        this.addHTMLTicketNotifier(this.subject.getActualTicket().getTurn(), false);
    }
    async addHTMLTicketNotifier(turn, state) {
        const turnNotifierHTML = await BankAttendTemplate.renderTurnNotifier(turn, state);
        const tempDiv = document.querySelector('.container-attend');
        tempDiv.innerHTML = turnNotifierHTML;
        this.addAttendListeners();
    }
    addAttendListeners() {
        const getTicket = document.querySelector('#get-ticket');
        if (!getTicket)
            return;
        getTicket.addEventListener('click', async () => {
            try {
                console.log('get ticket');
                const ticket = this.subject.getActualTicket();
                console.log(ticket);
                const newFormContent = await BankAttendTemplate.renderTicket(ticket);
                const mainContainer = document.querySelector('.main-container');
                if (mainContainer) {
                    mainContainer.innerHTML = newFormContent;
                    this.addHTMLTicketNotifier(this.subject.getActualTicket().getTurn(), true);
                    this.subject.attendTicket();
                    this.addSubmitListeners();
                    UtilBoostrap.showToast('success', 'Información de ticket cargada');
                }
                else {
                    UtilBoostrap.showToast('error', 'Error al cargar la información del ticket');
                }
            }
            catch (e) {
                console.log('Error', e);
                UtilBoostrap.showToast('error', 'Error al cargar la información del ticket');
            }
        });
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
        const submitAppointment = document.querySelector('#submit-appointment');
        submitAppointment.addEventListener('click', async () => {
            const appointmentType = document.querySelector('#appointment_type');
            const appointmentDescription = document.querySelector('#appointment_description');
            const appointmentDate = document.querySelector('#appointment_date');
            const appointmentHour = document.querySelector('#appointment_hour');
            const appointmentAddress = document.querySelector('#appointment_address');
            const notesAppointment = document.querySelector('#notes_appointment');
            const response = await this.subject.finishTurn(notesAppointment.value);
            if (response) {
                UtilBoostrap.showToast('success', 'Cita terminada exitosamente');
                appointmentType.value = '';
                appointmentDescription.value = '';
                appointmentDate.value = '';
                appointmentHour.value = '08:00';
                appointmentAddress.value = '';
                notesAppointment.value = '';
                const userIdentification = document.querySelector('#user_identification');
                const userName = document.querySelector('#user_name');
                const userLastName = document.querySelector('#user_last_name');
                const userAddress = document.querySelector('#user_address');
                const userBirthday = document.querySelector('#user_birthday');
                userIdentification.value = '';
                userName.value = '';
                userLastName.value = '';
                userAddress.value = '';
                userBirthday.value = '';
            }
            else {
                UtilBoostrap.showToast('error', 'Actualización de cita fallida');
            }
        });
    }
}
