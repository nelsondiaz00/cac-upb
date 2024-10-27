export default class CreateTicketTemplate {
  public static render(): string {
    return ` <header>
      <h1>CAC-UPB</h1>
      <h2>GENERAR TICKET</h2>
    </header>
    <form class="w-50 m-auto mt-4 p-4">
      <div class="mb-3">
        <label for="user_identification_get" class="form-label"
          >Ingresa el número de la cita</label
        >
        <input
          type="number"
          id="user_identification_get"
          name="user_identification_get"
          class="form-control"
          placeholder="Número de cita"
        />
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <input
          type="button"
          id="submit-identification-user"
          value="Generar ticket"
          class="btn form-control w-50 bg-success text-white"
        />
      </div>
    </form>`;
  }
}
