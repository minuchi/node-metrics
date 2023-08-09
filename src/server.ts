import http from 'http';
import { Registry } from 'prom-client';

export const getIPFromRequest = (req: http.IncomingMessage) => {
  return (
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    ''
  ).toString();
};

export const logHttpRequest = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const message = {
    date: new Date().toISOString(),
    level: 'info',
    type: 'http',
    method: req.method,
    userAgent: req.headers['user-agent'],
    url: req.url,
    statusCode: res.statusCode,
    ip: getIPFromRequest(req),
  };

  console.log(JSON.stringify(message));
};

export const createServer = (register: Registry) => {
  return http.createServer(async (req, res) => {
    if (req.url === '/health') {
      return res.end('OK');
    }

    if (req.url === '/metrics') {
      return res
        .setHeader('Content-Type', register.contentType)
        .end(await register.metrics());
    }

    return res.writeHead(404).end('Not Found');
  });
};

export const runServer = (server: http.Server, port: number) => {
  server.on('request', logHttpRequest);
  server.listen(port, () => {
    console.log(
      JSON.stringify({
        date: new Date().toISOString(),
        level: 'info',
        type: 'server',
        message: `Server listening to ${port}, metrics exposed on /metrics endpoint`,
      }),
    );
  });
};
