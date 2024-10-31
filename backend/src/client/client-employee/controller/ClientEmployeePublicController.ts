import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export default class ClientEmployeePublicController {
  public index = (req: Request, res: Response): void => {
    const { module } = req.params;
    const filePath = path.resolve(__dirname, '../public/index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo:', err);
        res.status(500).send('Error del servidor');
        return;
      }
      // console.log('acá llegó ', module);

      let pageValue = '';
      switch (module) {
        case 'appointments':
          pageValue = module;
          break;
        case 'appointments-canceled':
          pageValue = module;
          break;
        case 'create':
          pageValue = module;
          break;
        case 'login':
          pageValue = module;
          break;
        case 'bank-attend':
          pageValue = module;
          break;
        default:
          pageValue = 'default';
      }
      const modifiedData = data.replace(
        /(meta name="path" page=")[^"]*(")/,
        `$1${pageValue}$2`
      );

      res.status(200).send(modifiedData);
    });
  };

  public not_found = (_req: Request, res: Response): void => {
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
  };
}
