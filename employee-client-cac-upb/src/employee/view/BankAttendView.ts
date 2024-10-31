// import UtilAppointment from '../../admin/shared/util/UtilTicket.js';
// import Employee from '../../shared/types/Employee.js';
// import { RoleEmployee } from '../../shared/types/RoleEmployee.js';
import BankAttendModel from '../model/BankAttendModel.js';
import BankAttendTemplate from '../template/BankAttendTemplate.js';
import Observer from '../../shared/types/Observer.js';
// import BootstrapTemplateToasts from '../../admin/shared/template/BootstrapTemplateToats.js';
import UtilBoostrap from '../../admin/shared/util/UtilBootstrap.js';

// import 'bootstrap/dist/css/bootstrap.min.css';

export default class BankAttendView extends Observer<BankAttendModel> {
  private selector: HTMLDivElement;
  private selectorName = 'employee';

  constructor(subject: BankAttendModel) {
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
    div.innerHTML = await BankAttendTemplate.render();
    this.selector.appendChild(div);
    this.addHTMLTicketNotifier('A001', false);
  }

  public async addHTMLTicketNotifier(
    turn: string,
    state: boolean
  ): Promise<void> {
    const turnNotifierHTML = await BankAttendTemplate.renderTurnNotifier(
      turn,
      state
    );
    const tempDiv = document.querySelector(
      '.container-attend'
    ) as HTMLDivElement;
    tempDiv.innerHTML = turnNotifierHTML;
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
    // const submitEmployee = document.querySelector(
    //   '#submit-employee'
    // ) as HTMLButtonElement;
    const getTicket = document.querySelector(
      '#get-ticket'
    ) as HTMLButtonElement;

    getTicket.addEventListener('click', async () => {
      try {
        const ticket = await (this.subject as BankAttendModel).getTicketById(
          'A001'
        );
        console.log(ticket);
        const newFormContent = await BankAttendTemplate.renderTicket(ticket);
        const mainContainer = document.querySelector(
          '.main-container'
        ) as HTMLFormElement;
        if (mainContainer) {
          mainContainer.innerHTML = newFormContent;
          this.addHTMLTicketNotifier('A001', true);
          this.addSubmitListeners();
          UtilBoostrap.showToast('success', 'Información de ticket cargada');
        } else {
          UtilBoostrap.showToast(
            'error',
            'Error al cargar la información del ticket'
          );
        }
      } catch (e) {
        console.log('Error', e);
        UtilBoostrap.showToast(
          'error',
          'Error al cargar la información del ticket'
        );
      }
    });

    // submitEmployee.addEventListener('click', async () => {
    //   // const form_user = document.querySelector('#form_user') as HTMLFormElement;
    //   const user_identification = document.querySelector(
    //     '#user_identification'
    //   ) as HTMLInputElement;
    //   const user_name = document.querySelector(
    //     '#user_name'
    //   ) as HTMLInputElement;
    //   const user_last_name = document.querySelector(
    //     '#user_last_name'
    //   ) as HTMLInputElement;
    //   const user_address = document.querySelector(
    //     '#user_address'
    //   ) as HTMLInputElement;
    //   const user_birthday = document.querySelector(
    //     '#user_birthday'
    //   ) as HTMLInputElement;

    //   const user_email = document.querySelector(
    //     '#user_email'
    //   ) as HTMLInputElement;

    //   const user_password = document.querySelector(
    //     '#user_password'
    //   ) as HTMLInputElement;

    //   const user_role = document.querySelector(
    //     '#user_role'
    //   ) as HTMLInputElement;

    //   const userRoleValue = user_role.value as RoleEmployee;

    //   if (userRoleValue !== 'ADMIN' && userRoleValue !== 'EMPLOYEE') {
    //     console.error('Rol de empleado no válido');
    //     UtilAppointment.showToast('error', 'Creación de usuario fallido');
    //   } else {
    //     const employee = new Employee(
    //       user_identification.value,
    //       user_name.value,
    //       user_last_name.value,
    //       new Date(user_birthday.value),
    //       user_address.value,
    //       user_email.value,
    //       user_password.value,
    //       userRoleValue
    //     );
    //     const response = await (this.subject as BankAttendModel).createEmployee(
    //       employee
    //     );
    //     if (response) {
    //       UtilAppointment.showToast('success', 'Usuario creado');
    //       user_identification.value = '';
    //       user_name.value = '';
    //       user_last_name.value = '';
    //       user_address.value = '';
    //       user_birthday.value = '';
    //       user_email.value = '';
    //       user_password.value = '';
    //       user_role.value = '';
    //     } else {
    //       UtilAppointment.showToast('error', 'Creación de usuario fallido');
    //     }
    //   }
    // });
  }
}
