import Ticket from '../types/Ticket';

export default class BankAttendTemplate {
  public static async renderTurnNotifier(
    turn: String,
    state: boolean
  ): Promise<string> {
    return `
        <h3>${state ? 'ATENDIENDO: ' + turn : 'TURNO EN COLA: ' + turn}</h3>
        ${
          state
            ? ''
            : `<input
          id="get-ticket"
          type="button"
          value="Atender cita"
          class="btn form-control bg-success text-white"
        />`
        }
        `;
  }
  public static async render(): Promise<string> {
    const bankData = localStorage.getItem('bank');
    const bank = bankData ? JSON.parse(bankData) : null;
    return `
    <div class="name-module">
      <h3>Atender citas desde banco ${bank ? bank : 'desconocido'}</h3>
    </div>
    <div class="container-attend">
    </div>
    <div class="main-container">
      <div class="container-component">
        <h3 class="text-center">Datos del cliente</h3>
        <form action="/" method="POST" class="form-employee">
          <div class="mb-3">
            <label for="user_identification" class="form-label">Cédula</label>
            <input
              type="number"
              id="user_identification"
              name="user_identification"
              class="form-control"
              placeholder="Cédula"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="user_name" class="form-label">Nombres</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              class="form-control"
              placeholder="Nombres"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="user_last_name" class="form-label">Apellidos</label>
            <input
              type="text"
              id="user_last_name"
              name="user_last_name"
              class="form-control"
              placeholder="Apellidos"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="user_address" class="form-label">Dirección</label>
            <input
              type="text"
              id="user_address"
              name="user_address"
              class="form-control"
              placeholder="Dirección"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="user_birthday" class="form-label"
              >Fecha de nacimiento</label
            >
            <input
              type="date"
              id="user_birthday"
              name="user_birthday"
              class="form-control"
              placeholder="Fecha de nacimiento"
              readonly
            />
          </div>
        </form>
      </div>
      <div class="container-component">
        <h3 class="text-center">Datos de la cita</h3>
        <form action="/" method="POST" class="form-employee">
          <div class="mb-3">
            <label for="appointment_type" class="form-label">Tipo</label>
            <select
              id="appointment_type"
              name="appointment_type"
              class="form-control"
              disabled
            >
              <option value="">Seleccione un tipo</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="appointment_description" class="form-label"
              >Descripción</label
            >
            <input
              type="text"
              id="appointment_description"
              name="appointment_description"
              class="form-control"
              placeholder="Descripción"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="appointment_date" class="form-label">Fecha</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              class="form-control"
              placeholder="Apellidos"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="appointment_hour" class="form-label">Hora</label>
            <select
              id="appointment_hour"
              name="appointment_hour"
              class="form-control"
              disabled
            >
              <option value="08:00">Seleccione una hora</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="appointment_address" class="form-label">Lugar</label>
            <select
              id="appointment_address"
              name="appointment_address"
              class="form-control"
              disabled
            >
              <option value="">Seleccione un lugar</option>
            </select>
          </div>
        </form>
      </div>
      <div class="container-component">
        <h3 class="text-center">Anotaciones</h3>
        
        <form action="/" method="POST" class="form-employee">         
          <div class="mb-3">
            <label for="appointment_date" class="form-label">Anotaciones</label>
            <textarea class="form-control" id="notes_appointment" rows="10" style="resize: none;" readonly placeholder="Escribe lo que consideres pertinente en la cita..."></textarea>
            
          </div> 
          <div class="mb-3 text-end">
            <input
              id="submit-appointment"
              type="button"
              value="Terminar cita"
              class="btn form-control w-50 bg-success text-white"
            />
          </div>
        </form>
      </div>
    </div>
        
        `;
  }

  public static async renderTicket(ticket: Ticket): Promise<string> {
    console.log(ticket.getAppointment(), ' appot');
    return `
      <div class="container-component">
        <h3 class="text-center">Datos del empleado</h3>
        <form action="/" method="POST" class="form-employee">
          <div class="mb-3">
            <label for="user_identification" class="form-label">Cédula</label>
            <input
              type="number"
              id="user_identification"
              name="user_identification"
              class="form-control"
              placeholder="Cédula"
              value="${ticket.getAppointment().getClient().getIdentification()}"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="user_name" class="form-label">Nombres</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              class="form-control"
              placeholder="Nombres"
              value="${ticket.getAppointment().getClient().getName()}"
              readonly
              
            />
          </div>
          <div class="mb-3">
            <label for="user_last_name" class="form-label">Apellidos</label>
            <input
              type="text"
              id="user_last_name"
              name="user_last_name"
              class="form-control"
              placeholder="Apellidos"
              value="${ticket.getAppointment().getClient().getLastname()}"
              readonly
              
            />
          </div>
          <div class="mb-3">
            <label for="user_address" class="form-label">Dirección</label>
            <input
              type="text"
              id="user_address"
              name="user_address"
              class="form-control"
              placeholder="Dirección"
              value="${ticket.getAppointment().getClient().getAddress()}"
              readonly              
            />
          </div>
          <div class="mb-3">
            <label for="user_birthday" class="form-label"
              >Fecha de nacimiento</label
            >
            <input
              type="date"
              id="user_birthday"
              name="user_birthday"
              class="form-control"
              placeholder="Fecha de nacimiento"
              value="${
                ticket
                  .getAppointment()
                  .getClient()
                  .getBirthday()
                  .toISOString()
                  .split('T')[0]
              }"
              readonly              
            />
          </div>
        </form>
      </div>
      <div class="container-component">
        <h3 class="text-center">Datos de la cita</h3>
        <form action="/" method="POST" class="form-employee">
          <div class="mb-3">
            <label for="appointment_type" class="form-label">Tipo</label>
              <select
                  id="appointment_type"
                  name="appointment_type"
                  class="form-control"
                  disabled
              >
                  <option value="">Seleccione un tipo</option>
                  <option value="reclamos" ${
                    ticket.getAppointment().getType() === 'reclamos'
                      ? 'selected'
                      : ''
                  }>Reclamos</option>
                  <option value="devoluciones" ${
                    ticket.getAppointment().getType() === 'devoluciones'
                      ? 'selected'
                      : ''
                  }>Devoluciones</option>
                  <option value="asesoria" ${
                    ticket.getAppointment().getType() === 'asesoria'
                      ? 'selected'
                      : ''
                  }>Asesoría de productos</option>
              </select>
          </div>
          <div class="mb-3">
            <label for="appointment_description" class="form-label"
              >Descripción</label
            >
            <input
              type="text"
              id="appointment_description"
              name="appointment_description"
              class="form-control"
              placeholder="Descripción"
              value="${ticket.getAppointment().getDescription()}"
              readonly                
            />
          </div>
          <div class="mb-3">
            <label for="appointment_date" class="form-label">Fecha</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              class="form-control"
              placeholder="Fecha"
              value="${
                ticket.getAppointment().getDate().toISOString().split('T')[0]
              }"        
              readonly                
            />
          </div>
          <div class="mb-3">
            <label for="appointment_hour" class="form-label">Hora</label>
            <select
                id="appointment_hour"
                name="appointment_hour"
                class="form-control"
                disabled
            >
                <option value="08:00" ${
                  ticket.getAppointment().getDate().getHours() === 8
                    ? 'selected'
                    : ''
                }>8:00</option>
                <option value="09:00" ${
                  ticket.getAppointment().getDate().getHours() === 9
                    ? 'selected'
                    : ''
                }>9:00</option>
                <option value="10:00" ${
                  ticket.getAppointment().getDate().getHours() === 10
                    ? 'selected'
                    : ''
                }>10:00</option>
                <option value="11:00" ${
                  ticket.getAppointment().getDate().getHours() === 11
                    ? 'selected'
                    : ''
                }>11:00</option>
                <option value="14:00" ${
                  ticket.getAppointment().getDate().getHours() === 14
                    ? 'selected'
                    : ''
                }>14:00</option>
                <option value="15:00" ${
                  ticket.getAppointment().getDate().getHours() === 15
                    ? 'selected'
                    : ''
                }>15:00</option>
                <option value="16:00" ${
                  ticket.getAppointment().getDate().getHours() === 16
                    ? 'selected'
                    : ''
                }>16:00</option>
                <option value="17:00" ${
                  ticket.getAppointment().getDate().getHours() === 17
                    ? 'selected'
                    : ''
                }>17:00</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="appointment_address" class="form-label">Lugar</label>
            <select
                id="appointment_address"
                name="appointment_address"
                class="form-control"
                disabled
            >
                <option value="">Seleccione un lugar</option>
                <option value="cañaveral" ${
                  ticket.getAppointment().getAddress() === 'cañaveral'
                    ? 'selected'
                    : ''
                }>Cañaveral</option>
            </select>
          </div>
        </form>
      </div>
      <div class="container-component">
        <h3 class="text-center">Anotaciones</h3>
        
        <form action="/" method="POST" class="form-employee">         
          <div class="mb-3">
            <label for="appointment_date" class="form-label">Anotaciones</label>
            <textarea class="form-control" id="notes_appointment" rows="10" style="resize: none;" placeholder="Escribe lo que consideres pertinente en la cita..."></textarea>
          </div> 
          <div class="mb-3 text-end">
            <input
              id="submit-appointment"
              type="button"
              value="Terminar cita"
              class="btn form-control w-50 bg-success text-white"
            />
          </div>
        </form>
      </div>
    `;
  }
}
