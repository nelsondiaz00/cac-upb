export default class PremiumProvider {
  public static get = (premiumString: string): boolean => {
    if (premiumString === '') {
      return false;
    }
    if (premiumString === '1') {
      return true;
    } else {
      return false;
    }
  };
}
