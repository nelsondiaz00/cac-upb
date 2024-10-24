import Client from '../../client/types/Client';

export default class AppointmentTemplate {
  public static async render(): Promise<string> {
    return `<header>
      <h1>CAC-UPB</h1>  
      <h2>PEDIR CITA</h2>
    </header>
    <div class="main-container">
      <div class="container-component">
        <h3 class="text-center">Datos del cliente</h3>
        <form class="w-50 m-auto mt-4 p-4">
          <div class="mb-3">
            <label for="user_identification_get" class="form-label"
              >Ingresa tú cédula</label
            >
            <input
              type="number"
              id="user_identification_get"
              name="user_identification_get"
              class="form-control"
              placeholder="Cédula"
            />
          </div>
          <div class="mb-3 text-end">
            <input
              type="button"
              id="submit-identification-user"
              value="Rellenar datos"
              class="btn form-control w-50 bg-success text-white"
            />
          </div>
        </form>
        <form id="form_user" class="w-50 m-auto mt-4 p-4">
          <div class="mb-3">
            <label for="user_identification" class="form-label">Cédula</label>
            <input
              type="text"
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
              <option value="">8:00</option>
              <option value="">9:00</option>
              <option value="">10:00</option>
              <option value="">11:00</option>
              <option value="">2:00</option>
              <option value="">3:00</option>
              <option value="">4:00</option>
              <option value="">5:00</option>
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
              value="Generar cita"
              class="btn form-control w-50 bg-success text-white"
            />
          </div>
        </form>
      </div>
    </div>`;
  }

  public static async renderClient(client: Client): Promise<string> {
    const isoDate = client.getBirthday();
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
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
              value="${formattedDate}"
              readonly
            />
          </div>
        </form>`;
  }
}
