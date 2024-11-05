import { RoleEmployee } from '../../../../domain/model/employee/RoleEmployee';

export default class RoleEmployeeProvider {
  public static get = (role: string): RoleEmployee => {
    if (role === 'ADMIN') {
      return 'ADMIN';
    } else {
      return 'EMPLOYEE';
    }
  };
}
