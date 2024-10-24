import CreateAppointmentModel from '../model/AppointmentModel.js';
import AppointmentTemplate from '../template/AppointmentTemplate.js';
import AppointmentTemplateModal from '../template/AppointmentTemplateModal.js';
import Appointment from '../types/Appointment.js';
import Observer from '../types/Observer.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateAppointmentView extends Observer<CreateAppointmentModel> {
  private selector: HTMLDivElement;
  private selectorName = 'appointment';

  constructor(subject: CreateAppointmentModel) {
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
    div.innerHTML = await AppointmentTemplate.render();
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
    const identificationUser = document.querySelector(
      '#user_identification_get'
    ) as HTMLInputElement;

    const submitIdentification = document.querySelector(
      '#submit-identification-user'
    ) as HTMLButtonElement;

    submitIdentification.addEventListener('click', async () => {
      const form_user = document.querySelector('#form_user') as HTMLFormElement;
      const client = await (
        this.subject as CreateAppointmentModel
      ).getUserByIdentification(identificationUser.value);
      const newFormContent = await AppointmentTemplate.renderClient(client);

      if (form_user) {
        form_user.innerHTML = newFormContent;
      }
      console.log(client);
    });

    const submitAppointment = document.querySelector(
      '#submit-appointment'
    ) as HTMLButtonElement;

    submitAppointment.addEventListener('click', async () => {
      // const form_user = document.querySelector('#form_user') as HTMLFormElement;
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

      const client = await (
        this.subject as CreateAppointmentModel
      ).getUserByIdentification(identificationUser.value);

      if (!client) {
        console.error('No se encontró el cliente');
        return;
      }

      const combinedDateTime = new Date(
        `${appointmentDate.value}T${appointmentHour.value}:00`
      );

      const newAppointment = new Appointment(
        '0',
        client,
        appointmentType.value,
        combinedDateTime,
        appointmentAddress.value,
        appointmentDescription.value
      );

      const response = await (
        this.subject as CreateAppointmentModel
      ).createAppointment(newAppointment);

      if (response) {
        const toastHTML =
          await AppointmentTemplateModal.renderAppointmentCreated();
        this.showToast(toastHTML);
        appointmentType.value = '';
        appointmentDescription.value = '';
        appointmentDate.value = '';
        appointmentHour.value = '08:00';
        appointmentAddress.value = '';
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

        const userIdentificationGet = document.querySelector(
          '#user_identification_get'
        ) as HTMLInputElement;
        userIdentificationGet.value = '';
        userIdentification.value = '';
        userName.value = '';
        userLastName.value = '';
        userAddress.value = '';
        userBirthday.value = '';
      } else {
        const toastHTML =
          await AppointmentTemplateModal.renderAppointmentError();
        this.showToast(toastHTML);
      }
    });
  }

  private showToast(toastHTML: string): void {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className =
        'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    toastContainer.innerHTML = toastHTML;

    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    } else {
      console.error('Toast element not found');
    }
  }
}
