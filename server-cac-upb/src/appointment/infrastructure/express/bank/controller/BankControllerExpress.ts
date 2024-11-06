import { Request, Response } from 'express';
import IBankControllerExpress from '../../../../domain/port/driver/bank/IBankControllerExpress';
import IBankUseCase from '../../../../domain/port/driver/bank/IBankUseCase';

export default class BankControllerExpress implements IBankControllerExpress {
  constructor(private readonly bankUseCase: IBankUseCase) {}
  async readBankByEmployeeIdentificacion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { idEmployee } = req.params;
      if (!idEmployee) {
        res.status(404).json({ message: 'Bad identification' });
        return;
      }
      const bank = await this.bankUseCase.getBankByEmployeeIdentificacion(
        idEmployee
      );
      if (bank) {
        if (bank.isNull()) {
          res.status(404).json({ message: 'Bank not found' });
          return;
        }
        res.status(200).json(bank);
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
  async readBankByTicket(req: Request, res: Response): Promise<void> {
    try {
      const { idTicket } = req.params;
      if (!idTicket) {
        res.status(404).json({ message: 'Bad id' });
        return;
      }
      const bank = await this.bankUseCase.getBankByTicket(idTicket);
      if (bank) {
        if (bank.isNull()) {
          res.status(404).json({ message: 'Bank not found' });
          return;
        }
        res.status(200).json(bank);
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }

  async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;

      if (!data || !data.idTicket || !data.idEmployee) {
        res.status(404).json({ message: 'Bad data' });
        return;
      }

      const result = await this.bankUseCase.updateBank(
        data.idTicket,
        data.idEmployee
      );

      if (result) {
        res.status(200).json({ message: 'Bank updated' });
      } else {
        res.status(404).json({ message: 'Bank not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.log(e);
    }
  }
}
