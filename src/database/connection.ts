import mongoose from "mongoose";
import { configs } from "../configs";

async function connectDatabase() {
  const databaseUrl = `mongodb://${configs.DATABASE.HOST}:${configs.DATABASE.PORT}`;

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
      console.error("Error connecting to database", error);
    });
}

export { connectDatabase };
