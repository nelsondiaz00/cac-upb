import IAppointmentClientRetriverService from '../../domain/port/driver/appointment-client/IAppointmentClientRetriverService';
import { updateFilePageValue } from '../../util/pageValue';
import path from 'path';

export default class AppointmentClientRetriverService
  implements IAppointmentClientRetriverService
{
  constructor() {}

  async retrieveAppointmentClientByIdentification(
    identification: string
  ): Promise<string> {
    const validModules = ['create', 'update'];
    const filePath = path.resolve(
      __dirname,
      '../../infrastructure/repository/directories/public-appointment/index.html'
    );
    return await updateFilePageValue(filePath, validModules, identification);
  }
}
