import Observer from '../../shared/types/Observer.js';
import UtilAppointment from '../../shared/util/UtilTicket.js';
import LoginTemplate from '../template/LoginTemplate.js';
export default class LoginView extends Observer {
    selector;
    selectorName = 'employee';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        console.log('appointment view init');
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
        div.innerHTML = await LoginTemplate.render();
        this.selector.appendChild(div);
    }
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
        });
    }
    addSubmitListeners() {
        const submitButton = document.getElementById('submit-login');
        const emailInput = document.getElementById('email-user');
        const passwordInput = document.getElementById('password-user');
        if (submitButton) {
            submitButton.addEventListener('click', async () => {
                console.log('Botón de enviar pulsado');
                const result = await this.subject.getEmployeeById(emailInput.value);
                if (!result.isNull()) {
                    const user = result;
                    console.log('Usuario encontrado');
                    if (user.getPassword() === passwordInput.value) {
                        console.log('Contraseña correcta');
                        localStorage.setItem('employee', JSON.stringify(user));
                        window.location.href = '/employee/appointments';
                    }
                    else {
                        console.log('Contraseña incorrecta');
                        UtilAppointment.showToast('error', 'Contraseña incorrecta');
                    }
                }
                else {
                    UtilAppointment.showToast('error', 'Dirección de correo no encontrada');
                }
            });
        }
        else {
            console.log('No se encontró el botón de enviar');
        }
    }
}
