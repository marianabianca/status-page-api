import { ParameterizedContext } from "koa";

import { updateStatus } from "./components.controller";
import Incident from "../models/incident.model";

export const findAll = async (ctx: ParameterizedContext) => {
  const incidents = await Incident.find();
  ctx.body = incidents;
};

export const findById = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;
  try {
    const incident = await Incident.findById(id);
    if (incident) {
      ctx.body = incident;
    } else {
      ctx.body = "ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const findByComponent = async (ctx: ParameterizedContext) => {
  const { componentId } = ctx.params;
  try {
    const incidents = await Incident.find({ componentId });
    if (incidents) {
      ctx.body = incidents;
    } else {
      ctx.body = "Component ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const create = async (ctx: ParameterizedContext) => {
  const incident = ctx.request.body;
  try {
    const newIncident = new Incident(incident);
    const savedIncident = await newIncident.save();
    const componentUpdated = await updateStatus(
      savedIncident.status,
      savedIncident.componentId
    );
    if (componentUpdated === "ok") {
      ctx.body = savedIncident;
    } else {
      ctx.body = componentUpdated;
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const deleteAll = async (ctx: ParameterizedContext) => {
  try {
    const deletedAll = await Incident.deleteMany({});
    ctx.body = deletedAll;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const deleteById = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;
  try {
    const incident = await Incident.findById(id);
    if (incident) {
      const deletedIncident = incident.remove();
      ctx.body = deletedIncident;
    } else {
      ctx.body = "ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const deleteByComponent = async (ctx: ParameterizedContext) => {
  const { componentId } = ctx.params;
  try {
    const deletedIncidents = await Incident.deleteMany({ componentId });
    ctx.body = deletedIncidents;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};
