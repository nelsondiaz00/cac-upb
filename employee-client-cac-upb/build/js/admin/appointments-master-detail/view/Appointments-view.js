import Observer from '../types/observer.js';
import AppointmentMasterDetailTemplate from '../template/AppointmentsTemplate.js';
export default class AppointmentMasterDetailView extends Observer {
    selector;
    selectorName = 'employee';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    async init() {
        this.selector = document.querySelector(this.selectorName);
        if (this.selector) {
            this.selector.innerHTML = await AppointmentMasterDetailTemplate.render();
        }
        this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.fillProduct();
    }
    async fillProduct() {
        const client = this.subject.getClient();
        if (client) {
            const appointments = this.subject.getAppointmentsPerClient(client.getIdentification());
            this.selector.innerHTML =
                await AppointmentMasterDetailTemplate.renderTable(appointments);
            this.addSubmitListeners();
            const id = document.getElementById('id');
            id.value = client.getIdentification();
            const title = document.getElementById('name');
            title.value = client.getName();
            const description = document.getElementById('lastname');
            description.value = client.getLastname();
            const price = document.getElementById('address');
            price.value = client.getAddress();
        }
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
        const buttonPrev = document.getElementById('prev');
        buttonPrev.addEventListener('click', () => {
            this.subject.previousPage();
        });
        const buttonNext = document.getElementById('next');
        buttonNext.addEventListener('click', () => {
            this.subject.nextPage();
        });
        // const discountElement = document.getElementById(
        //   'discount'
        // ) as HTMLSelectElement;
        // const discountperElement = document.getElementById(
        //   'discountper'
        // ) as HTMLInputElement;
        // const discountuniElement = document.getElementById(
        //   'discountuni'
        // ) as HTMLInputElement;
        // discountElement.addEventListener('change', () => {
        //   if (discountElement.value === 'true') {
        //     discountperElement.removeAttribute('readonly');
        //     discountuniElement.removeAttribute('readonly');
        //   } else {
        //     discountperElement.value = '0';
        //     discountuniElement.value = '';
        //     discountperElement.setAttribute('readonly', 'true');
        //     discountuniElement.setAttribute('readonly', 'true');
        //   }
        // });
    }
}
