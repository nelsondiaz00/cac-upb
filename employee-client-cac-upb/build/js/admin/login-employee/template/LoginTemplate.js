export default class LoginTemplate {
    static async render() {
        return `
    <div class="name-module">
      <h3>Inicio de sesión</h3>
    </div>
     <div class="container-fluid" id="container-fluid">
      <form class="w-50 m-auto mt-4 p-4">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email-user"
            placeholder="Ingresa tu email"
            autocomplete="username"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="password-user"
            placeholder="Ingresa tu contraseña"
            autocomplete="current-password"
          />
        </div>
        <button id="submit-login" type="button" class="btn btn-success">
          Iniciar sesión
        </button>
      </form>
    </div>
        
        `;
    }
}
