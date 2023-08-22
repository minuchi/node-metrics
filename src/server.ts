import { Registry } from 'prom-client';
import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';

export const createServer = (register: Registry) => {
  const app = express();

  app.use(morgan('combined'));
  app.get('/health', (_, res) => {
    res.send('OK');
  });

  app.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  });

  return app;
};

export const runServer = (app: express.Express, port: number) => {
  app.listen(port, () => {
    console.log(
      `Server listening to ${port}, metrics exposed on /metrics endpoint`,
    );
  });
};
