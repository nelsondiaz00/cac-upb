export default class AddressAppointmentProvider {
  public static get = (address: string): string => {
    if (address === '') {
      return 'error';
    }
    if (address === 'cañaveral') {
      return address;
    } else {
      return 'error';
    }
  };
}
