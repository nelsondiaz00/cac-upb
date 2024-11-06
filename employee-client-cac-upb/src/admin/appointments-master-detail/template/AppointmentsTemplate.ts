import Appointment from '../../../shared/types/Appointment';

export default class AppointmentMasterDetailTemplate {
  public static async render(): Promise<string> {
    return `<div class="row">

        <div class="col-md-10 m-auto">
          <form class="row g-3 bg-dark-subtle m-2 p-4 rounded" id="prods">
            <div class="col-md-12">
              <label type="text" class="form-label">Información cliente</label>
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Identificación</label>
              <input type="text" class="form-control" id="id" readonly/>
            </div>
            <div class="col-md-3">
              <label for="id" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="name" readonly />
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastname" readonly/>
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="address" readonly/>
            </div>
            <div class="col-sm-12 text-end">
              <button type="button" class="btn btn-secondary" id="prev">
                Anterior
              </button>
              <button type="button" class="btn btn-secondary" id="next">
                Siguiente
              </button>
              <button
                type="button"
                class="btn btn-primary visually-hidden"
                id="save"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>`;
  }

  public static async renderTable(
    appointments: Appointment[]
  ): Promise<string> {
    return `<div class="row">

        <div class="col-md-10 m-auto">
          <form class="row g-3 bg-dark-subtle m-2 p-4 rounded" id="prods">
            <div class="col-md-12">
              <label type="text" class="form-label">Información cliente</label>
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Identificación</label>
              <input type="text" class="form-control" id="id" />
            </div>
            <div class="col-md-3">
              <label for="id" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="name" readonly />
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastname" readonly/>
            </div>
            <div class="col-md-3">
              <label for="title" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="address" readonly/>
            </div>
      <div class="mt-10">
        <label type="text" class="form-label">Detalle de citas</label>
      </div>


    <div class="table-responsive">
      <table class="table table-light table-bordered border-dark">
        <thead class="text-dark">
          <tr>
            <th scope="col" class="text-dark">ID</th>
            <th scope="col" class="text-dark">Nombres</th>
            <th scope="col" class="text-dark">Apellido</th>
            <th scope="col" class="text-dark">Tipos de cita</th>
            <th scope="col" class="text-dark">Fecha</th>
            <th scope="col" class="text-dark">Dirección</th>
            <th scope="col" class="text-dark">Descripción</th>
            <th scope="col" class="text-dark">Notas</th>
          </tr>
        </thead>
        <tbody>
          ${appointments
            .map(
              (appointment) => `
            <tr>
          <td class="text-dark"><div>${appointment.getId()}</div></td>
          <td class="text-dark"><div>${appointment
            .getClient()
            .getName()}</div></td>
          <td class="text-dark"><div>${appointment
            .getClient()
            .getLastname()}</div></td>
          <td class="text-dark"><div>${appointment.getType()}</div></td>
          <td class="text-dark"><div>${appointment.getDate()}</div></td>
          <td class="text-dark"><div>${appointment.getAddress()}</div></td>
          <td class="text-dark"><div>${
            appointment.getDescription() === ''
              ? 'N/A'
              : appointment.getDescription()
          }</div></td>
          <td class="text-dark"><div>${
            appointment.getNotes() === ''
              ? 'SIN ATENDER'
              : appointment.getNotes()
          }</div></td>
        </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      </div>
        

            <div class="col-sm-12 text-end">
              <button type="button" class="btn btn-secondary" id="prev">
                Anterior
              </button>
              <button type="button" class="btn btn-secondary" id="next">
                Siguiente
              </button>
              <button
                type="button"
                class="btn btn-primary visually-hidden"
                id="save"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>`;
  }
}
