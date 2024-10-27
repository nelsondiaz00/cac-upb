export default class ShowAppointmentTemplate {
    static async renderAppointments(appointments) {
        return `
            <header>
                <h1>CAC-UPB</h1>
                <h2>CITAS CANCELADAS</h2>
            </header>
            <div class="container">
             <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Client Name</th>
            <th scope="col">Client Lastname</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${appointments
            .map((appointment, index) => `
            <tr>
              <th scope="row">${index + 1}</th>
              <td>${appointment.getClient().getName()}</td>
              <td>${appointment.getClient().getLastname()}</td>
              <td>${appointment.getType()}</td>
              <td>${appointment.getDate()}</td>
              <td>${appointment.getAddress()}</td>
              <td>${appointment.getDescription()}</td>
            </tr>
          `)
            .join('')}
        </tbody>
      </table>
      </div>
        
        `;
    }
}
