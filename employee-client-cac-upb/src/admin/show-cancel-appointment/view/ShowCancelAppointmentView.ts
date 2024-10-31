import ShowCancelAppointmentModel from '../model/ShowCancelAppointmentModel.js';
import Observer from '../../../shared/types/Observer.js';
import ShowAppointmentTemplate from '../template/ShowAppointmentTemplate.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class ShowCancelAppointmentView extends Observer<ShowCancelAppointmentModel> {
  private selector: HTMLDivElement;
  private selectorName = 'employee';

  constructor(subject: ShowCancelAppointmentModel) {
    super(subject);
    this.selector = document.createElement('div');
  }

  public init(): void {
    // console.log('appointment view init');
    this.selector = document.querySelector(this.selectorName) as HTMLDivElement;
    // console.log(this.selector);
    // this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    this.showTable();

    // console.log(this.selector);
  }

  public addListeners(): void {
    window.addEventListener('DOMContentLoaded', () => {});
  }

  public async showTable(): Promise<void> {
    const appointments = await (
      this.subject as ShowCancelAppointmentModel
    ).getAllAppointmentsCanceled();

    this.selector.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'employee';
    this.selector.appendChild(div);

    div.innerHTML = await ShowAppointmentTemplate.renderAppointments(
      appointments
    );
  }
}
