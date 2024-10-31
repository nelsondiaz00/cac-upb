import Observer from '../../../shared/types/Observer.js';
import ShowAppointmentTemplate from '../template/ShowAppointmentTemplate.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class ShowAppointmentView extends Observer {
    selector;
    selectorName = 'employee';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        // console.log('appointment view init');
        this.selector = document.querySelector(this.selectorName);
        // console.log(this.selector);
        // this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.showTable();
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => { });
    }
    async showTable() {
        const appointments = await this.subject.getAllAppointments();
        this.selector.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'employee';
        this.selector.appendChild(div);
        div.innerHTML = await ShowAppointmentTemplate.renderAppointments(appointments);
    }
}
