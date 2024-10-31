import Employee from '../../../shared/types/Employee.js';
import Observer from '../../../shared/types/Observer.js';
import UtilBoostrap from '../../shared/util/UtilBootstrap.js';
import LoginModel from '../model/LoginModel.js';
import LoginTemplate from '../template/LoginTemplate.js';
export default class LoginView extends Observer<LoginModel> {
  private selector: HTMLDivElement;
  private selectorName = 'employee';

  constructor(subject: LoginModel) {
    super(subject);
    this.selector = document.createElement('div');
  }

  public init(): void {
    console.log('appointment view init');
    this.selector = document.querySelector(this.selectorName) as HTMLDivElement;
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    this.selector.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'appointment';
    div.innerHTML = await LoginTemplate.render();
    this.selector.appendChild(div);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
    });
  }

  public addSubmitListeners(): void {
    const submitButton = document.getElementById('submit-login');
    const emailInput = document.getElementById(
      'email-user'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password-user'
    ) as HTMLInputElement;
    if (submitButton) {
      submitButton.addEventListener('click', async () => {
        console.log('Botón de enviar pulsado');

        const result = await (this.subject as LoginModel).getEmployeeById(
          emailInput.value
        );
        if (!result.isNull()) {
          const user = result as Employee;
          console.log('Usuario encontrado');
          if (user.getPassword() === passwordInput.value) {
            console.log('Contraseña correcta');
            localStorage.setItem('employee', JSON.stringify(user));
            if (user.getRole() === 'ADMIN') {
              window.location.href = '/employee/appointments';
            } else {
              window.location.href = '/employee/bank-attend';
            }
          } else {
            console.log('Contraseña incorrecta');
            UtilBoostrap.showToast('error', 'Contraseña incorrecta');
          }
        } else {
          UtilBoostrap.showToast('error', 'Dirección de correo no encontrada');
        }
      });
    } else {
      console.log('No se encontró el botón de enviar');
    }
  }
}
