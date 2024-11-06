export default class TypeAppointmentProvider {
  public static get = (type: string): string => {
    if (type === '') {
      return 'error';
    }
    if (
      type === 'reclamos' ||
      type === 'Consultation' ||
      type === 'devoluciones'
    ) {
      return type;
    } else {
      return 'error';
    }
  };
}
