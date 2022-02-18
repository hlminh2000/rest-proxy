import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(morgan("combined"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
