import Client from '../../client/types/Client.js';
import Environment from '../../shared/Environment.js';
import NullPerson from '../../shared/NullPerson.js';
import Subject from '../types/Subject.js';
import AppointmentView from '../view/AppointmentView.js';

export default class AppointmentModel extends Subject<AppointmentView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {
    // console.log('appointment model init');
    this.notifyAllObservers();
  };

  public getUserByIdentification = async (id: string): Promise<Client> => {
    const response = await fetch(
      await Environment.getClientByIdentification(id)
    );
    if (response.status !== 200) {
      return new NullPerson();
    }

    const responseData = await response.json();
    const client = new Client(
      responseData.identification,
      responseData.name,
      responseData.lastname,
      responseData.birthday,
      responseData.address
    );

    return client;
  };
}
