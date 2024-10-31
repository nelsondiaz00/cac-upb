export default class UpdateAppointmentTemplate {
    static async render() {
        return `
    <div class="name-module">
      <h3>Actualizar cita</h3>
    </div>
<div id="update-main-container" class="update-main-container">
  <div class="appointment-id-container">
    <form class="w-50 m-auto mt-4 p-4">
      <div class="mb-3">
        <label for="user_identification_get" class="form-label"
          >Ingresa el número de cita</label
        >
        <input
          type="number"
          id="appointment_id"
          name="appointment_id"
          class="form-control"
          placeholder="Número de cita"
        />
      </div>
      <div class="mb-3 text-end">
        <input
          type="button"
          id="submit-appointment-id"
          value="Rellenar datos"
          class="btn form-control w-50 bg-success text-white"
        />
      </div>
    </form>
  </div>
  <div id="components-container" class="components-container">
    <div class="container-component">
      <h3 class="text-center">Datos del cliente</h3>
      <form id="form_user" class="w-50 m-auto mt-4 p-4">
        <div class="mb-3">
          <label for="user_identification_get" class="form-label">Cédula</label>
          <input
            type="number"
            id="user_identification"
            name="user_identification"
            class="form-control"
            placeholder="Cédula"
          />
        </div>
        <div class="mb-3 text-end">
          <input
            type="button"
            id="submit-identification-user"
            value="Actualizar cliente"
            class="btn form-control w-50 bg-success text-white"
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
      <form action="/" method="POST" class="w-50 m-auto mt-4 p-4">
        <div class="mb-3">
          <label for="appointment_type" class="form-label">Tipo</label>
          <select
            id="appointment_type"
            name="appointment_type"
            class="form-control"
          >
            <option value="">Seleccione un tipo</option>
            <option value="reclamos">Reclamos</option>
            <option value="devoluciones">Devoluciones</option>
            <option value="asesoria">Asesoría de productos</option>
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
          />
        </div>
        <div class="mb-3">
          <label for="appointment_hour" class="form-label">Hora</label>
          <select
            id="appointment_hour"
            name="appointment_hour"
            class="form-control"
          >
            <option value="08:00">8:00</option>
            <option value="09:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="appointment_address" class="form-label">Lugar</label>
          <select
            id="appointment_address"
            name="appointment_address"
            class="form-control"
          >
            <option value="">Seleccione un lugar</option>
            <option value="cañaveral">Cañaveral</option>
          </select>
        </div>
        <div class="mb-3 text-end">
          <input
            id="submit-appointment"
            type="button"
            value="Actualizar cita"
            class="btn form-control w-50 bg-success text-white"
          />
        </div>
        <div class="mb-3 text-end">
          <button 
            type="button" 
            class="btn  w-50 btn-danger"
            id="delete-appointment"
            >Cancelar cita
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

`;
    }
    static async renderAppointment(appointment) {
        return `
      <div class="container-component">
          <h3 class="text-center">Datos del cliente</h3>
          <form id="form_user" class="w-50 m-auto mt-4 p-4">
              <div class="mb-3">
                  <label for="user_identification" class="form-label">Cédula</label>
                  <input
                      type="number"
                      id="user_identification"
                      name="user_identification"
                      class="form-control"
                      placeholder="Cédula"
                      value="${appointment.getClient().getIdentification()}" 
                      
                  />
              </div>
              <div class="mb-3 text-end">
                  <input
                      type="button"
                      id="submit-identification-user"
                      value="Actualizar cliente"
                      class="btn form-control w-50 bg-success text-white"
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
                      value="${appointment.getClient().getName()}"
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
                      value="${appointment.getClient().getLastname()}"
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
                      value="${appointment.getClient().getAddress()}"
                      readonly
                  />
              </div>
              <div class="mb-3">
                  <label for="user_birthday" class="form-label">Fecha de nacimiento</label>
                  <input
                      type="date"
                      id="user_birthday"
                      name="user_birthday"
                      class="form-control"
                      value="${appointment
            .getClient()
            .getBirthday()
            .toISOString()
            .split('T')[0]}"
                      readonly
                  />

              </div>
          </form>
      </div>
      <div class="container-component">
          <h3 class="text-center">Datos de la cita</h3>
          <form action="/" method="POST" class="w-50 m-auto mt-4 p-4">
              <div class="mb-3">
                  <label for="appointment_type" class="form-label">Tipo</label>
                  <select
                      id="appointment_type"
                      name="appointment_type"
                      class="form-control"
                  >
                      <option value="">Seleccione un tipo</option>
                      <option value="reclamos" ${appointment.getType() === 'reclamos' ? 'selected' : ''}>Reclamos</option>
                      <option value="devoluciones" ${appointment.getType() === 'devoluciones'
            ? 'selected'
            : ''}>Devoluciones</option>
                      <option value="asesoria" ${appointment.getType() === 'asesoria' ? 'selected' : ''}>Asesoría de productos</option>
                  </select>
              </div>
              <div class="mb-3">
                  <label for="appointment_description" class="form-label">Descripción</label>
                  <input
                      type="text"
                      id="appointment_description"
                      name="appointment_description"
                      class="form-control"
                      placeholder="Descripción"
                      value="${appointment.getDescription()}"
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
                      value="${appointment.getDate().toISOString().split('T')[0]}"
                  />
              </div>
              <div class="mb-3">
                  <label for="appointment_hour" class="form-label">Hora</label>
                  <select
                      id="appointment_hour"
                      name="appointment_hour"
                      class="form-control"
                  >
                      <option value="08:00" ${appointment.getDate().getHours() === 8 ? 'selected' : ''}>8:00</option>
                      <option value="09:00" ${appointment.getDate().getHours() === 9 ? 'selected' : ''}>9:00</option>
                      <option value="10:00" ${appointment.getDate().getHours() === 10
            ? 'selected'
            : ''}>10:00</option>
                      <option value="11:00" ${appointment.getDate().getHours() === 11
            ? 'selected'
            : ''}>11:00</option>
                      <option value="14:00" ${appointment.getDate().getHours() === 14
            ? 'selected'
            : ''}>14:00</option>
                      <option value="15:00" ${appointment.getDate().getHours() === 15
            ? 'selected'
            : ''}>15:00</option>
                      <option value="16:00" ${appointment.getDate().getHours() === 16
            ? 'selected'
            : ''}>16:00</option>
                      <option value="17:00" ${appointment.getDate().getHours() === 17
            ? 'selected'
            : ''}>17:00</option>
                  </select>
              </div>
              <div class="mb-3">
                  <label for="appointment_address" class="form-label">Lugar</label>
                  <select
                      id="appointment_address"
                      name="appointment_address"
                      class="form-control"
                  >
                      <option value="">Seleccione un lugar</option>
                      <option value="cañaveral" ${appointment.getAddress() === 'cañaveral'
            ? 'selected'
            : ''}>Cañaveral</option>
                  </select>
              </div>
              <div class="mb-3 text-end">
          <input
            id="submit-appointment"
            type="button"
            value="Actualizar cita"
            class="btn form-control w-50 bg-success text-white"
          />
        </div>
        <div class="mb-3 text-end">
          <button 
            type="button" 
            class="btn  w-50 btn-danger"
            id="delete-appointment"
            >Cancelar cita
          </button>
        </div>
          </form>
      </div>

    `;
    }
    static async renderClient(client) {
        return `<form class="w-50 m-auto mt-4 p-4">
          <div class="mb-3">
            <label for="user_identification" class="form-label">Cédula</label>
            <input
              type="text"
              id="user_identification"
              name="user_identification"
              class="form-control"
              placeholder="Cédula"
              value="${client.getIdentification()}"
              
            />
          </div>
          <div class="mb-3 text-end">
                  <input
                      type="button"
                      id="submit-identification-user"
                      value="Actualizar cliente"
                      class="btn form-control w-50 bg-success text-white"
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
              value="${client.getName()}"
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
              value="${client.getLastname()}"
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
              value="${client.getAddress()}"
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
              value="${client.getBirthday().toISOString().split('T')[0]}"
              readonly
            />
          </div>
        </form>`;
    }
}
