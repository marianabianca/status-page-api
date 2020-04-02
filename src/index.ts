import Koa from "koa";
import Router from "koa-router";
import Mongoose from "mongoose";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

Mongoose.connect("mongodb://127.0.0.1:27017/statuspage", {
  useNewUrlParser: true,
});

const app = new Koa();
const router = new Router();
const db = Mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => process.stdout.write("Database connected."));

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "Hello world!" };

  await next();
});

router.post("/test/:name", async (ctx, next) => {
  const { body } = ctx.request;
  const { name } = ctx.params;
  ctx.body = { name, body };

  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  process.stdout.write("koa started");
});
