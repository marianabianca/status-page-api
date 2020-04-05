import Koa from "koa";
import Router from "koa-router";
import Mongoose from "mongoose";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import {
  findAll as findComponents,
  findById as findComponent,
  create as createComponent,
  deleteAll as deleteComponents,
  deleteById as deleteComponent,
  update as updateComponent,
} from "./controllers/components.controller";
import {
  findAll as findIncidents,
  findById as findIncident,
  findByComponent as findIncidentByComponent,
  create as createIncident,
  deleteAll as deleteIncidents,
  deleteById as deleteIncident,
  deleteByComponent as deleteIncidentByComponent,
} from "./controllers/incidents.controller";

Mongoose.connect("mongodb://127.0.0.1:27017/statuspage", {
  useNewUrlParser: true,
});

const app = new Koa();
const router = new Router();
const db = Mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => process.stdout.write("\nDatabase connected.\n"));

router.get("/components", findComponents);
router.get("/component/:id", findComponent);
router.post("/component", createComponent);
router.delete("/components", deleteComponents);
router.delete("/component/:id", deleteComponent);
router.put("/component/:id", updateComponent);

router.get("/incidents", findIncidents);
router.get("/incident/:id", findIncident);
router.get("/incidents/component/:componentId", findIncidentByComponent);
router.post("/incident", createIncident);
router.delete("/incidents", deleteIncidents);
router.delete("/incident/:id", deleteIncident);
router.delete("/incidents/component/:componentId", deleteIncidentByComponent);

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  process.stdout.write("\nkoa started\n");
});
