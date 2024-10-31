import Observer from '../../shared/types/Observer.js';
import CreateEmployeeTemplate from '../template/CreateEmployeeTemplate.js';
import Employee from '../../shared/types/Employee.js';
import UtilAppointment from '../../shared/util/UtilTicket.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateEmployeeView extends Observer {
    selector;
    selectorName = 'employee';
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
        div.innerHTML = await CreateEmployeeTemplate.render();
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
        const submitEmployee = document.querySelector('#submit-employee');
        submitEmployee.addEventListener('click', async () => {
            // const form_user = document.querySelector('#form_user') as HTMLFormElement;
            const user_identification = document.querySelector('#user_identification');
            const user_name = document.querySelector('#user_name');
            const user_last_name = document.querySelector('#user_last_name');
            const user_address = document.querySelector('#user_address');
            const user_birthday = document.querySelector('#user_birthday');
            const user_email = document.querySelector('#user_email');
            const user_password = document.querySelector('#user_password');
            const user_role = document.querySelector('#user_role');
            const userRoleValue = user_role.value;
            if (userRoleValue !== 'ADMIN' && userRoleValue !== 'EMPLOYEE') {
                console.error('Rol de empleado no válido');
                UtilAppointment.showToast('error', 'Creación de usuario fallido');
            }
            else {
                const employee = new Employee(user_identification.value, user_name.value, user_last_name.value, new Date(user_birthday.value), user_address.value, user_email.value, user_password.value, userRoleValue);
                const response = await this.subject.createEmployee(employee);
                if (response) {
                    UtilAppointment.showToast('success', 'Usuario creado');
                    user_identification.value = '';
                    user_name.value = '';
                    user_last_name.value = '';
                    user_address.value = '';
                    user_birthday.value = '';
                    user_email.value = '';
                    user_password.value = '';
                    user_role.value = '';
                }
                else {
                    UtilAppointment.showToast('error', 'Creación de usuario fallido');
                }
            }
        });
    }
}
