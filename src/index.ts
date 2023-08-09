import { getRegistery } from './metric';
import { createServer, runServer } from './server';

(() => {
  const port = parseInt(process.env.PORT || '3000', 10);

  const register = getRegistery();
  const server = createServer(register);

  runServer(server, port);
})();
