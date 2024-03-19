import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then((address) => {
    console.log(`Server listening on ${address}`);
  })
  .catch((err) => {
    console.error(`Error starting server: ${err}`);
  });
