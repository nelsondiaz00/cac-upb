export default class HeaderTemplate {
  public static async renderDropDownAdmin(nameUser: string): Promise<string> {
    // HTML del menú desplegable
    const dropdownHtml = `
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ${nameUser}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/employee/appointments">Ver citas</a>
                </li>
                <li>
                  <a class="dropdown-item" href="/employee/create">Crear usuarios</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" id="logout">Salir de cuenta</a>
                </li>
              </ul>
            </div>
    `;

    setTimeout(() => {
      const logoutButton = document.getElementById('logout');
      if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
          event.preventDefault(); // Evitar navegación por el href
          await this.closeAccount();
          window.location.href = '/employee/login';
        });
      }
    }, 0);

    return dropdownHtml;
  }

  public static async renderDropDownEmployee(
    nameUser: string
  ): Promise<string> {
    // HTML del menú desplegable
    const dropdownHtml = `
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ${nameUser}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/employee/bank-attend">Atender cita</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" id="logout">Salir de cuenta</a>
                </li>
              </ul>
            </div>
    `;

    // Añadimos el HTML al DOM y agregamos el event listener
    setTimeout(() => {
      const logoutButton = document.getElementById('logout');
      if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
          event.preventDefault(); // Evitar navegación por el href
          await this.closeAccount();
          window.location.href = '/employee/login';
        });
      }
    }, 0);

    return dropdownHtml;
  }

  public static async closeAccount(): Promise<void> {
    localStorage.removeItem('employee');
  }

  public static async renderHeaderButton(): Promise<string> {
    return `
            <a type="button" class="btn btn-success" href="/employee/login">
              Iniciar sesión
            </a>
          `;
  }
}
