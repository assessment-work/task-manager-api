import mongoose from "mongoose";
import { configs } from "../configs";

enum DatabaseConnectionStringScheme {
  MONGODB = "mongodb",
  MONGODB_SRV = "mongodb+srv",
}

async function connectDatabase() {
  const databaseUrl =
    configs.DATABASE.CONNECTION_STRING_SCHEME ===
    DatabaseConnectionStringScheme.MONGODB_SRV
      ? `${configs.DATABASE.CONNECTION_STRING_SCHEME}://${configs.DATABASE.HOST}`
      : `${configs.DATABASE.CONNECTION_STRING_SCHEME}://${configs.DATABASE.HOST}:${configs.DATABASE.PORT}`;

  await mongoose
    .connect(databaseUrl, {
      dbName: configs.DATABASE.NAME,
      user: configs.DATABASE.USER,
      pass: configs.DATABASE.PASSWORD,
    })
    .then(() => {
      console.info(`Connected with database: ${databaseUrl}`);
    })
    .catch((error) => {
      console.error("Error connecting to database", { error, databaseUrl });
    });
}

export { connectDatabase };
