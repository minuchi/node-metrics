import http from 'http';
import client from 'prom-client';

const getRegistery = () => {
  const register = new client.Registry();

  register.setDefaultLabels({
    app: 'node-metrics',
  });

  client.collectDefaultMetrics({ register });

  return register;
};

const createServer = () => {
  const register = getRegistery();

  return http.createServer(async (req, res) => {
    if (req.url === '/health') {
      return res.end('OK');
    }
    if (req.url === '/metrics') {
      return res
        .setHeader('Content-Type', register.contentType)
        .end(await register.metrics());
    }

    return res.writeHead(404).end();
  });
};

const runServer = (server: http.Server, port: number) => {
  server.listen(port, () => {
    console.log(
      `Server listening to ${port}, metrics exposed on /metrics endpoint`,
    );
  });
};

(() => {
  const server = createServer();
  const port = parseInt(process.env.PORT || '3000', 10);
  runServer(server, port);
})();
