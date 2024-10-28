import Employee from '../../create-employee/types/Employee.js';
import Environment from '../../shared/types/Environment.js';
import NullPerson from '../../shared/types/NullPerson.js';
import Subject from '../../shared/types/Subject.js';
import LoginView from '../view/LoginView.js';
export default class LoginModel extends Subject<LoginView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public getEmployeeById = async (
    id: string
  ): Promise<Employee | NullPerson> => {
    const endpoint = await Environment.getEmployeeById(id);
    console.log(endpoint);
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.error('Error al obtener el usuario');
      return new NullPerson();
    }
    const user = await response.json();
    const employee = new Employee(
      user.identification,
      user.name,
      user.lastname,
      new Date(user.birthdate),
      user.address,
      user.email,
      user.password,
      user.role
    );
    console.log(employee);
    return employee;
  };
}
