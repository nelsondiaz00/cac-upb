export default class BirthdayProvider {
  public static get = (birthday: string): string => {
    if (birthday === '') {
      return '';
    }
    return new Date(birthday).toISOString().split('T')[0] || '';
  };
}
