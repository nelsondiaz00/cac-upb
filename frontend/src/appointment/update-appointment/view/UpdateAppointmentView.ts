import UpdateAppointmentModel from '../model/UpdateAppointmentModel.js';
import UpdateAppointmentTemplate from '../template/UpdateAppointmentTemplate.js';
import Appointment from '../../shared/types/Appointment.js';
// import AppointmentTemplateModal from '../template/AppointmentTemplateModal.js';
// import Appointment from '../types/Appointment.js';
import Observer from '../../shared/types/Observer.js';
import UtilAppointment from '../../shared/util/UtilAppointment.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class UpdateAppointmentView extends Observer<UpdateAppointmentModel> {
  private selector: HTMLDivElement;
  private selectorName = 'appointment';

  constructor(subject: UpdateAppointmentModel) {
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
    div.innerHTML = await UpdateAppointmentTemplate.render();
    this.selector.appendChild(div);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
      this.addAppointmentListener();
      console.log('addSubmitListeners');
    });
  }

  public addAppointmentListener(): void {
    const idAppointment = document.querySelector(
      '#appointment_id'
    ) as HTMLInputElement;
    const submitIdentificationAppointment = document.querySelector(
      '#submit-appointment-id'
    ) as HTMLButtonElement;
    submitIdentificationAppointment.addEventListener('click', async () => {
      console.log('submitIdentificationAppointment');
      const info_appointment = document.querySelector(
        '#components-container'
      ) as HTMLFormElement;
      const appointment = await (
        this.subject as UpdateAppointmentModel
      ).getAppointmentById(idAppointment.value);
      console.log(appointment.isNull(), ' app');
      if (appointment.isNull()) {
        UtilAppointment.showToast('error', 'Cita no encontrada');
        return;
      } else {
        UtilAppointment.showToast('success', 'Cita cargada exitosamente');
      }

      console.log(appointment);

      const newFormContent = await UpdateAppointmentTemplate.renderAppointment(
        appointment
      );
      if (info_appointment) {
        info_appointment.innerHTML = newFormContent;
        this.addSubmitListeners();
      }
    });
  }

  public addSubmitListeners(): void {
    console.log('demás submits');
    const idAppointment = document.querySelector(
      '#appointment_id'
    ) as HTMLInputElement;

    const identificationUser = document.querySelector(
      '#user_identification'
    ) as HTMLInputElement;

    const submitIdentificationUser = document.querySelector(
      '#submit-identification-user'
    ) as HTMLButtonElement;
    //  console.log(submitIdentificationUser);

    submitIdentificationUser.addEventListener('click', async () => {
      console.log('click');
      const form_user = document.querySelector('#form_user') as HTMLFormElement;
      const client = await (
        this.subject as UpdateAppointmentModel
      ).getUserByIdentification(identificationUser.value);
      if (!client.getIdentification()) {
        UtilAppointment.showToast('error', 'Espacio de identificación vacío');
        return;
      }
      const newFormContent = await UpdateAppointmentTemplate.renderClient(
        client
      );

      console.log(client);

      if (client.isNull()) {
        UtilAppointment.showToast('error', 'Cliente no encontrado');
      } else {
        UtilAppointment.showToast('success', 'Cliente cargado exitosamente');
      }
      console.log(form_user);
      if (form_user) {
        form_user.innerHTML = newFormContent;
      }
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
        this.subject as UpdateAppointmentModel
      ).getUserByIdentification(identificationUser.value);
      if (!client.getIdentification()) {
        UtilAppointment.showToast('error', 'Error en creación de cita');
        return;
      }
      const combinedDateTime = new Date(
        `${appointmentDate.value}T${appointmentHour.value}:00`
      );
      const newAppointment = new Appointment(
        idAppointment.value,
        client,
        appointmentType.value,
        combinedDateTime,
        appointmentAddress.value,
        appointmentDescription.value,
        ''
      );
      const response = await (
        this.subject as UpdateAppointmentModel
      ).updateAppointment(newAppointment);
      if (response) {
        UtilAppointment.showToast('success', 'Cita actualizada exitosamente');
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

        idAppointment.value = '';
        userIdentification.value = '';
        userName.value = '';
        userLastName.value = '';
        userAddress.value = '';
        userBirthday.value = '';
      } else {
        UtilAppointment.showToast('error', 'Actualización de cita fallida');
      }
    });

    const deleteAppointment = document.querySelector(
      '#delete-appointment'
    ) as HTMLButtonElement;

    deleteAppointment.addEventListener('click', async () => {
      const response = await (
        this.subject as UpdateAppointmentModel
      ).deleteAppointment(idAppointment.value);
      if (response) {
        UtilAppointment.showToast('success', 'Cita eliminada exitosamente');
        idAppointment.value = '';
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

        idAppointment.value = '';
        userIdentification.value = '';
        userName.value = '';
        userLastName.value = '';
        userAddress.value = '';
        userBirthday.value = '';

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

        appointmentType.value = '';
        appointmentDescription.value = '';
        appointmentDate.value = '';
        appointmentHour.value = '08:00';
        appointmentAddress.value = '';
      } else {
        UtilAppointment.showToast('error', 'Eliminación de cita fallida');
      }
    });
  }
}
