import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;
const TARGET_HOST = process.env.TARGET_HOST || "https://google.com";

const app = express();

app.use(
  "*",
  bodyParser.json(),
  morgan("combined"),
  (req, res, next) => {
    console.log("body: ", req.body);
    next();
  },
  createProxyMiddleware({ target: TARGET_HOST, changeOrigin: true })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
