import IAppointmentClientRetriverService from '../../domain/port/driver/appointment-client/IAppointmentClientRetriverService';
import { updateFilePageValue } from '../../util/pageValue';
import path from 'path';

export default class ClientRetriverService
  implements IAppointmentClientRetriverService
{
  constructor() {}
  async retrieveTicketClientByModule(identification: string): Promise<string> {
    const validModules = ['create', 'queue'];
    return await updateFilePageValue(
      path.resolve(
        __dirname,
        '../../infrastructure/repository/directories/public-ticket/index.html'
      ),
      validModules,
      identification
    );
  }
  async retrieveEmployeeClientByModule(
    identification: string
  ): Promise<string> {
    const validModules = [
      'appointments',
      'appointments-canceled',
      'create',
      'login',
      'bank-attend',
    ];
    return await updateFilePageValue(
      path.resolve(
        __dirname,
        '../../infrastructure/repository/directories/public-employee/index.html'
      ),
      validModules,
      identification
    );
  }

  async retrieveAppointmentClientByModule(
    identification: string
  ): Promise<string> {
    const validModules = ['create', 'update'];
    return await updateFilePageValue(
      path.resolve(
        __dirname,
        '../../infrastructure/repository/directories/public-appointment/index.html'
      ),
      validModules,
      identification
    );
  }
}
