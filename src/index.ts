import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: ".env.local",
});

import { configs } from "./configs";
import { authRouter, taskRouter } from "./routes";
import { connectDatabase } from "./database/connection";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({ appVersion: `v${process.env.npm_package_version}` });
});

app.use("/auth", authRouter());
app.use("/task", taskRouter());

async function startServer() {
  await connectDatabase();

  app.listen(configs.SERVER.PORT, () => {
    console.log(
      `Server is running on ${configs.SERVER.HOST}:${configs.SERVER.PORT}`
    );
  });
}

startServer();
