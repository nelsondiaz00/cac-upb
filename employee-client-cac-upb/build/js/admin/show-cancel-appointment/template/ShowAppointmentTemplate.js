export default class ShowAppointmentTemplate {
    static async renderAppointments(appointments) {
        return `
            <div class="name-module">
      <h3>Citas canceladas</h3>
    </div>
            <div class="container">
             <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido</th>
            <th scope="col">Tipos de cita</th>
            <th scope="col">Fecha</th>
            <th scope="col">Dirección</th>
            <th scope="col">Descripción</th>
            <th scope="col">Notas</th>
          </tr>
        </thead>
        <tbody>
          ${appointments
            .map((appointment) => `
            <tr>
              <td>${appointment.getId()}</td>
              <td>${appointment.getClient().getName()}</td>
              <td>${appointment.getClient().getLastname()}</td>
              <td>${appointment.getType()}</td>
              <td>${appointment.getDate()}</td>
              <td>${appointment.getAddress()}</td>
              <td>${appointment.getDescription() === ''
            ? 'N/A'
            : appointment.getDescription()}</td>
              <td>${appointment.getNotes() === '' ? 'N/A' : appointment.getNotes()}</td>
            </tr>
          `)
            .join('')}
        </tbody>
      </table>
      </div>
        
        `;
    }
}
