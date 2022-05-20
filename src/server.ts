import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./shared/infrastructure/database/db";

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
