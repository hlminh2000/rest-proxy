import express, { response } from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import bodyParser from "body-parser";
import fetch from "isomorphic-fetch";

const PORT = process.env.PORT || 5000;
const TARGET_HOST = process.env.TARGET_HOST || "https://google.com";

const app = express();

app.use(
  "*",
  bodyParser.json(),
  //   morgan("combined"),
  (req, res, next) => {
    console.log("body: ", req.body);
    next();
  },
  //   createProxyMiddleware({ target: TARGET_HOST, changeOrigin: true }),
  async (req, res) => {
    const respose = await fetch(
      `${TARGET_HOST}/dev/jumioProcessCddApplication`,
      {
        method: "POST",
        body: JSON.stringify(req.body),
      }
    ).then((res: any) => res.json());
    console.log("response: ", response);
    res.send(respose);
  }
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
