import Koa from "koa";
import Router from "koa-router";
import Mongoose from "mongoose";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import {
  findAll,
  findById,
  create,
  deleteAll,
  deleteById,
} from "./controllers/components";

Mongoose.connect("mongodb://127.0.0.1:27017/statuspage", {
  useNewUrlParser: true,
});

const app = new Koa();
const router = new Router();
const db = Mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => process.stdout.write("\nDatabase connected.\n"));

router.get("/components", findAll);
router.get("/component/:id", findById);
router.post("/component", create);
router.post("/component/delete-all", deleteAll);
router.post("/component/delete-by-id/:id", deleteById);

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  process.stdout.write("\nkoa started\n");
});
