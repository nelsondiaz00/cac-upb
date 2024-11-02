import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import RouterExpress from '../../domain/RouterExpress';

export default class Server {
  private readonly app: Application;

  constructor(private readonly routers: RouterExpress[]) {
    this.app = express();
    this.statics();
    this.config();
    this.routes();
  }

  public config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  public statics = (): void => {
    this.app.use(
      '/appointment',
      express.static(
        path.resolve(
          __dirname,
          '../../../client/infrastructure/repository/directories/public-appointment'
        )
      )
    );
  };

  public routes = (): void => {
    this.routers.forEach((router) => {
      this.app.use('/api/v1.0/cac/', cors(), router.router);
      this.app.use('/', cors(), router.router);
    });
  };

  public start = (): void => {
    const PORT = process.env['PORT'] ?? 3000;
    const HOST = process.env['HOST'] ?? 'localhost';
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  };
}
