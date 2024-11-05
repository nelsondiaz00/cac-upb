import CreateAppointmentModel from '../model/CreateAppointmentModel.js';
import CreateAppointmentTemplate from '../template/CreateAppointmentTemplate.js';
import Appointment from '../../shared/types/Appointment.js';
import Observer from '../../shared/types/Observer.js';
import UtilAppointment from '../../shared/util/UtilAppointment.js';
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
    div.innerHTML = await CreateAppointmentTemplate.render();
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
      if (!client.getIdentification()) {
        UtilAppointment.showToast('error', 'Error al cargar datos');
        return;
      }
      const newFormContent = await CreateAppointmentTemplate.renderClient(
        client
      );

      console.log(client);

      if (client.isNull()) {
        UtilAppointment.showToast('error', 'Cliente no encontrado');
      } else {
        UtilAppointment.showToast('success', 'Cliente cargado exitosamente');
      }

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
        appointmentDescription.value,
        ''
      );

      const response = await (
        this.subject as CreateAppointmentModel
      ).createAppointment(newAppointment);

      if (response !== '') {
        UtilAppointment.showToast('success', 'Cita creada exitosamente');
        UtilAppointment.showModal(response);
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
        UtilAppointment.showToast('error', 'Cita fallida');
      }
    });
  }
}
