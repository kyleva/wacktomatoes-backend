/* Third-party dependencies */
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import express, { Express } from 'express';
import helmet from 'helmet';
import 'reflect-metadata';

/** Our code */
import routes from './routes';

createConnection().then(() => {
  console.log('anyone there?');
  const app: Express = express();
  const port: number = Number(process.env.PORT) || 3030;

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use('/', routes);

  app.listen(port, (err: string) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`server listening on port ${port}`);
  });
});
