import AppointmentModel from '../model/AppointmentModel.js';
import AppointmentTemplate from '../template/AppointmentTemplate.js';
import Observer from '../types/Observer.js';

export default class AppointmentView extends Observer<AppointmentModel> {
  private selector: HTMLDivElement;
  private selectorName = 'appointment';

  constructor(subject: AppointmentModel) {
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
        this.subject as AppointmentModel
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
      const form_user = document.querySelector('#form_user') as HTMLFormElement;
      const client = await (
        this.subject as AppointmentModel
      ).getUserByIdentification(identificationUser.value);
      const newFormContent = await AppointmentTemplate.renderClient(client);

      if (form_user) {
        form_user.innerHTML = newFormContent;
      }
      console.log(client);
    });
  }

  //   private appointmentModel(): AppointmentModel {
  //     return this.subject as AppointmentModel;
  //   }

  //   private movies(): Movie[] {
  //     return this.moviesModel().getMovies();
  //   }
}
