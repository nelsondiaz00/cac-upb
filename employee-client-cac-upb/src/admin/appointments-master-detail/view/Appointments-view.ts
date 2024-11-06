import Observer from '../types/observer.js';
import AppointmentMasterDetailModel from '../model/Appointments-model.js';
import AppointmentMasterDetailTemplate from '../template/AppointmentsTemplate.js';
export default class AppointmentMasterDetailView extends Observer<AppointmentMasterDetailModel> {
  private selector: HTMLDivElement;
  private selectorName = 'employee';

  constructor(subject: AppointmentMasterDetailModel) {
    super(subject);
    this.selector = document.createElement('div');
  }

  public async init() {
    this.selector = document.querySelector(this.selectorName) as HTMLDivElement;
    if (this.selector) {
      this.selector.innerHTML = await AppointmentMasterDetailTemplate.render();
    }
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    this.fillProduct();
  }

  private async fillProduct(): Promise<void> {
    const client = (this.subject as AppointmentMasterDetailModel).getClient();
    if (client) {
      const appointments = (
        this.subject as AppointmentMasterDetailModel
      ).getAppointmentsPerClient(client.getIdentification());
      this.selector.innerHTML =
        await AppointmentMasterDetailTemplate.renderTable(appointments);
      this.addSubmitListeners();
      const id = document.getElementById('id') as HTMLInputElement;
      id.value = client.getIdentification();
      const title = document.getElementById('name') as HTMLInputElement;
      title.value = client.getName();
      const description = document.getElementById(
        'lastname'
      ) as HTMLInputElement;
      description.value = client.getLastname();
      const price = document.getElementById('address') as HTMLInputElement;
      price.value = client.getAddress();
    }
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
    const buttonPrev = document.getElementById('prev') as HTMLButtonElement;

    buttonPrev.addEventListener('click', () => {
      (this.subject as AppointmentMasterDetailModel).previousPage();
    });

    const buttonNext = document.getElementById('next') as HTMLButtonElement;
    buttonNext.addEventListener('click', () => {
      (this.subject as AppointmentMasterDetailModel).nextPage();
    });

    // const discountElement = document.getElementById(
    //   'discount'
    // ) as HTMLSelectElement;
    // const discountperElement = document.getElementById(
    //   'discountper'
    // ) as HTMLInputElement;
    // const discountuniElement = document.getElementById(
    //   'discountuni'
    // ) as HTMLInputElement;
    // discountElement.addEventListener('change', () => {
    //   if (discountElement.value === 'true') {
    //     discountperElement.removeAttribute('readonly');
    //     discountuniElement.removeAttribute('readonly');
    //   } else {
    //     discountperElement.value = '0';
    //     discountuniElement.value = '';
    //     discountperElement.setAttribute('readonly', 'true');
    //     discountuniElement.setAttribute('readonly', 'true');
    //   }
    // });
  }
}
