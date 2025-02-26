import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: ".env.local",
});

import { configs } from "../configs";

const app = express();

app.get("/", (_, res) => {
  res.json({ appVersion: `v${process.env.npm_package_version}` });
});

app.listen(configs.SERVER.PORT, () => {
  console.log(
    `Server is running on ${configs.SERVER.HOST}:${configs.SERVER.PORT}`
  );
});
