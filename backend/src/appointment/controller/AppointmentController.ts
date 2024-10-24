import AppointmentModel from '../model/AppointmentModel';
import { Request, Response } from 'express';
import NullAppointment from '../types/NullAppointment';
import Client from '../../client-component/types/Client';
import Appointment from '../types/Appointment';
// import NullPerson from '../../shared/NullPerson';

export default class AppointmentController {
  constructor(private readonly appointmentModel: AppointmentModel) {}

  public getAppointmentById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    if (id) {
      const appointment = await this.appointmentModel.getAppointmentById(id);
      res.json(appointment);
    } else {
      res.json(NullAppointment);
    }
  };

  public getAppointments = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const appointments = await this.appointmentModel.getAppointments();
    res.json(appointments);
  };

  public getAppointmentsDeleted = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const appointments = await this.appointmentModel.getAppointmentsDeleted();
    res.json(appointments);
  };

  public updateAppointment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const appointmentData = req.body;

    console.log(appointmentData);

    if (
      !appointmentData.client_identification ||
      !appointmentData.id ||
      !appointmentData.type ||
      !appointmentData.date ||
      !appointmentData.address ||
      !appointmentData.description
    ) {
      res.status(400).json({ error: 'Datos incompletos para la cita' });
    } else {
      const client = new Client(
        appointmentData.client_identification.toString(),
        '',
        '',
        new Date(''),
        ''
      );

      const appointment = new Appointment(
        appointmentData.id.toString(),
        client,
        appointmentData.type,
        new Date(appointmentData.date),
        appointmentData.address,
        appointmentData.description
      );

      try {
        await this.appointmentModel.updateAppointment(appointment);
        res.status(200).json({ message: 'Appointment updated' });
      } catch (error) {
        // console.error('Error al actualizar la cita:', error);
        res.status(500).json({ error: 'No se pudo actualizar la cita' });
      }
    }
  };

  public createAppointment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const appointmentDataComplete = req.body;
    const appointmentData = appointmentDataComplete.appointment;
    if (
      !appointmentData.client ||
      !appointmentData.client.identification ||
      !appointmentData.type ||
      !appointmentData.date ||
      !appointmentData.address ||
      !appointmentData.description
    ) {
      res.status(400).json({ error: 'Datos incompletos para la cita' });
      // console.log(appointmentData);
    } else {
      // console.log(appointmentData.appointment);
      const client = new Client(
        appointmentData.client.identification.toString(),
        '',
        '',
        new Date(),
        ''
      );

      const appointment = new Appointment(
        '',
        client,
        appointmentData.type,
        new Date(appointmentData.date),
        appointmentData.address,
        appointmentData.description
      );

      try {
        await this.appointmentModel.createAppointment(appointment);
        res.status(201).json({ message: 'Appointment added' });
      } catch (error) {
        // console.error('Error al agregar la cita:', error);
        res.status(500).json({ error: 'No se pudo agregar la cita' });
      }
    }
  };

  public deleteAppointment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      if (id) {
        await this.appointmentModel.deleteAppointment(id);
        res.json({ message: 'Appointment deleted' });
      } else {
        res.status(400).json({ error: 'ID vacío' });
      }
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      res.status(500).json({ error: 'No se pudo eliminar la cita' });
    }
  };
}
