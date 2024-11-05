import IRepository from '../../repository/IRepository';
import IAppointmentClientData from '../../types/IAppointmentClientData';
import IAppointmentData from '../../types/IAppointmentData';
import IBankData from '../../types/IBankData';
import IClientData from '../../types/IClientData';
import IEmployeeData from '../../types/IEmployeeData';
import ITicketData from '../../types/ITicketData';

export default interface ICacUPBRepository
  extends IRepository<
    IAppointmentData,
    IClientData,
    IAppointmentClientData,
    ITicketData,
    IEmployeeData,
    IBankData
  > {}
