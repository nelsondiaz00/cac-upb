export default class CreateEmployeeTemplate {
    static async render() {
        return `
    <div class="name-module">
      <h3>Crear usuarios</h3>
    </div>
    <div class="main-container">
      <div class="container-component">
        <h3 class="text-center">Datos del empleado</h3>
        <form id="form_user" class="w-50 m-auto mt-4 p-4">
          <div class="mb-3">
            <label for="user_identification" class="form-label">Cédula</label>
            <input
              type="number"
              id="user_identification"
              name="user_identification"
              class="form-control"
              placeholder="Cédula"
              
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
            />
          </div>
        </form>
      </div>
      <div class="container-component">
        <form class="w-50 m-auto mt-4 p-4">
          <div class="mb-3">
            <label for="user_email" class="form-label">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="mb-3">
            <label for="user_password" class="form-label">Contraseña</label>
            <input
              type="password"
              id="user_password"
              name="user_password"
              class="form-control"
              placeholder="Contraseña"
            />
          </div>
          <div class="mb-3">
            <label for="user_role" class="form-label">Rol</label>
            <select
              id="user_role"
              name="user_role"
              class="form-control"
            >
              <option value="">Seleccione un tipo</option>
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
          </div>

          <div class="mb-3 text-end">
            <input
              id="submit-employee"
              type="button"
              value="Crear empleado"
              class="btn form-control w-50 bg-success text-white"
            />
          </div>
        </form>
      </div>
    </div>
        
        `;
    }
}
