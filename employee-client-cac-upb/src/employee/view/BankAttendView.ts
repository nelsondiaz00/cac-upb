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
    this.addHTMLTicketNotifier('A006', false);
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
    const getTicket = document.querySelector(
      '#get-ticket'
    ) as HTMLButtonElement;

    getTicket.addEventListener('click', async () => {
      try {
        const ticket = await (this.subject as BankAttendModel).getTicketById(
          'A006'
        );
        console.log(ticket);
        const newFormContent = await BankAttendTemplate.renderTicket(ticket);
        const mainContainer = document.querySelector(
          '.main-container'
        ) as HTMLFormElement;
        if (mainContainer) {
          mainContainer.innerHTML = newFormContent;
          this.addHTMLTicketNotifier(
            (this.subject as BankAttendModel).getActualTicket().getTurn(),
            true
          );
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

    const submitAppointment = document.querySelector(
      '#submit-appointment'
    ) as HTMLButtonElement;

    submitAppointment.addEventListener('click', async () => {
      const appointmentType = document.querySelector(
        '#appointment_type'
      ) as HTMLSelectElement;
      const appointmentDescription = document.querySelector(
        '#appointment_description'
      ) as HTMLInputElement;
      const appointmentDate = document.querySelector(
        '#appointment_date'
      ) as HTMLInputElement;
      const appointmentHour = document.querySelector(
        '#appointment_hour'
      ) as HTMLSelectElement;
      const appointmentAddress = document.querySelector(
        '#appointment_address'
      ) as HTMLSelectElement;

      const notesAppointment = document.querySelector(
        '#notes_appointment'
      ) as HTMLInputElement;

      const response = await (this.subject as BankAttendModel).finishTurn(
        notesAppointment.value
      );

      if (response) {
        UtilBoostrap.showToast('success', 'Cita terminada exitosamente');
        appointmentType.value = '';
        appointmentDescription.value = '';
        appointmentDate.value = '';
        appointmentHour.value = '08:00';
        appointmentAddress.value = '';
        notesAppointment.value = '';
        const userIdentification = document.querySelector(
          '#user_identification'
        ) as HTMLInputElement;
        const userName = document.querySelector(
          '#user_name'
        ) as HTMLInputElement;
        const userLastName = document.querySelector(
          '#user_last_name'
        ) as HTMLInputElement;
        const userAddress = document.querySelector(
          '#user_address'
        ) as HTMLInputElement;
        const userBirthday = document.querySelector(
          '#user_birthday'
        ) as HTMLInputElement;

        userIdentification.value = '';
        userName.value = '';
        userLastName.value = '';
        userAddress.value = '';
        userBirthday.value = '';
      } else {
        UtilBoostrap.showToast('error', 'Actualización de cita fallida');
      }
    });
  }
}
