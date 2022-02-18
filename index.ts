import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT || 5000;
const TARGET_HOST = process.env.TARGET_HOST || "https://google.com";

const app = express();

app.use(morgan("combined"));
app.use("*", createProxyMiddleware({ target: TARGET_HOST }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
