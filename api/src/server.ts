import { app } from './app';

app.listen(
  {
    port: Number(process.env.API_PORT) || 8080,
    host: process.env.API_HOST || '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
