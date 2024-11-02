import { Request, Response } from 'express';
import IAppointmentControllerExpress from '../../../../domain/port/driver/appointment/IAppointmentControllerExpress';
import IAppointmentUseCase from '../../../../domain/port/driver/appointment/IAppointmentUseCase';

export default class AppointmentControllerExpress
  implements IAppointmentControllerExpress
{
  constructor(private readonly appointmentUseCase: IAppointmentUseCase) {}
  async createAppointment(req: Request, res: Response): Promise<void> {
    const appointmentData = req.body;
    try {
      const result = await this.appointmentUseCase.createAppointment(
        appointmentData
      );
      if (result) {
        res.status(201).json({ message: 'Appointment created' });
      } else {
        res.status(400).json({ message: 'Appointment could not be created' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async updateAppointment(req: Request, res: Response): Promise<void> {
    const appointmentData = req.body;

    try {
      const result = await this.appointmentUseCase.updateAppointment(
        appointmentData
      );
      if (result) {
        res.status(200).json({ message: 'Appointment updated' });
      } else {
        res.status(400).json({ message: 'Appointment could not be updated' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async deleteAppointment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id) {
        const result = await this.appointmentUseCase.deleteAppointment(id);
        if (result) {
          res.status(200).json({ message: 'Appointment deleted' });
        } else {
          res.status(400).json({ error: 'No se pudo eliminar la cita' });
        }
      } else {
        res.status(400).json({ error: 'ID vacío' });
      }
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      res.status(500).json({ error: 'No se pudo eliminar la cita' });
    }
  }

  async readAppointmentsDeleted(_req: Request, res: Response): Promise<void> {
    try {
      const appointments =
        await this.appointmentUseCase.getAppointmentsDeleted();
      // console.log(appointments);
      if (appointments) {
        res.status(200).json(appointments);
      } else {
        res.status(404).json({ message: 'Appointments not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async readAppointments(_req: Request, res: Response): Promise<void> {
    try {
      const appointments = await this.appointmentUseCase.getAppointments();
      // console.log(appointments);
      if (appointments) {
        res.status(200).json(appointments);
      } else {
        res.status(404).json({ message: 'Appointments not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }

  async readAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ message: 'Bad id' });
        return;
      }
      const appointment = await this.appointmentUseCase.getAppointmentById(id);
      if (appointment) {
        if (appointment.isNull()) {
          res.status(404).json({ message: 'Appointment not found' });
          return;
        }
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
}
