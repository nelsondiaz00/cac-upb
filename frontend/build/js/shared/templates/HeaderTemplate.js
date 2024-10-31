export default class HeaderTemplate {
    static async renderDropDown(nameUser) {
        return `
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
                  <a class="dropdown-item" href="/employee/appointments"
                    >Ver citas</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/employee/appointments-canceled"
                    >Ver citas canceladas</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="/employee/create"
                    >Crear usuarios</a
                  >
                </li>
              </ul>
            </div>
    `;
    }
}
