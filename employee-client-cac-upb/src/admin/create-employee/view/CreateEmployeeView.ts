import CreateEmployeeModel from '../model/CreateEmployeeModel.js';
import Observer from '../../../shared/types/Observer.js';
import CreateEmployeeTemplate from '../template/CreateEmployeeTemplate.js';
import Employee from '../../../shared/types/Employee.js';
import { RoleEmployee } from '../../../shared/types/RoleEmployee.js';
import UtilBoostrap from '../../shared/util/UtilBootstrap.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateEmployeeView extends Observer<CreateEmployeeModel> {
  private selector: HTMLDivElement;
  private selectorName = 'employee';

  constructor(subject: CreateEmployeeModel) {
    super(subject);
    this.selector = document.createElement('div');
  }

  public init(): void {
    // console.log('appointment view init');
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
    div.innerHTML = await CreateEmployeeTemplate.render();
    this.selector.appendChild(div);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
      // const submitIdentification = document.querySelector(
      //   '#submit-identification-user'
      // ) as HTMLButtonElement;

      // console.log(submitIdentification);
    });
  }

  public addSubmitListeners(): void {
    const submitEmployee = document.querySelector(
      '#submit-employee'
    ) as HTMLButtonElement;

    submitEmployee.addEventListener('click', async () => {
      // const form_user = document.querySelector('#form_user') as HTMLFormElement;
      const user_identification = document.querySelector(
        '#user_identification'
      ) as HTMLInputElement;
      const user_name = document.querySelector(
        '#user_name'
      ) as HTMLInputElement;
      const user_last_name = document.querySelector(
        '#user_last_name'
      ) as HTMLInputElement;
      const user_address = document.querySelector(
        '#user_address'
      ) as HTMLInputElement;
      const user_birthday = document.querySelector(
        '#user_birthday'
      ) as HTMLInputElement;

      const user_email = document.querySelector(
        '#user_email'
      ) as HTMLInputElement;

      const user_password = document.querySelector(
        '#user_password'
      ) as HTMLInputElement;

      const user_role = document.querySelector(
        '#user_role'
      ) as HTMLInputElement;

      const userRoleValue = user_role.value as RoleEmployee;

      if (userRoleValue !== 'ADMIN' && userRoleValue !== 'EMPLOYEE') {
        console.error('Rol de empleado no válido');
        UtilBoostrap.showToast('error', 'Creación de usuario fallido');
      } else {
        const employee = new Employee(
          user_identification.value,
          user_name.value,
          user_last_name.value,
          new Date(user_birthday.value),
          user_address.value,
          user_email.value,
          user_password.value,
          userRoleValue
        );
        const response = await (
          this.subject as CreateEmployeeModel
        ).createEmployee(employee);
        if (response) {
          UtilBoostrap.showToast('success', 'Usuario creado');
          user_identification.value = '';
          user_name.value = '';
          user_last_name.value = '';
          user_address.value = '';
          user_birthday.value = '';
          user_email.value = '';
          user_password.value = '';
          user_role.value = '';
        } else {
          UtilBoostrap.showToast('error', 'Creación de usuario fallido');
        }
      }
    });
  }
}
