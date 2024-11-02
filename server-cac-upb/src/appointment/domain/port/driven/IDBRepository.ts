import Appointment from '../../model/appointment/Appointment';
import IRepository from '../../repository/IRepository';
import IAppointmentClientData from '../../types/IAppointmentClientData';
import IAppointmentData from '../../types/IAppointmentData';
import IClient from '../../types/IClientData';

export default interface ICacUPBRepository
  extends IRepository<IAppointmentData, IClient, IAppointmentClientData> {}
