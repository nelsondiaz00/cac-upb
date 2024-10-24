import AppointmentTemplate from '../template/AppointmentTemplate.js';
import Observer from '../types/Observer.js';
export default class AppointmentView extends Observer {
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
            const form_user = document.querySelector('#form_user');
            const client = await this.subject.getUserByIdentification(identificationUser.value);
            const newFormContent = await AppointmentTemplate.renderClient(client);
            if (form_user) {
                form_user.innerHTML = newFormContent;
            }
            console.log(client);
        });
    }
}
