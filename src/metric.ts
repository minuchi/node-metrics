import client from 'prom-client';

export const getRegistery = () => {
  const register = new client.Registry();

  register.setDefaultLabels({
    app: 'node-metrics',
  });

  client.collectDefaultMetrics({ register });

  return register;
};
