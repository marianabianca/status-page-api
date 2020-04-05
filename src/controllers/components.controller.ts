import { ParameterizedContext } from "koa";

import { Status } from "../models/status.enum";
import Component, { ComponentModel } from "../models/component.model";

export const findAll = async (ctx: ParameterizedContext) => {
  const components = await Component.find();
  ctx.body = components;
};

export const findById = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;
  try {
    const component = await Component.findById(id);
    if (component) {
      ctx.body = component;
    } else {
      ctx.body = "ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const create = async (ctx: ParameterizedContext) => {
  const component = ctx.request.body;
  try {
    const newComponent = new Component(component);
    const savedComponent = await newComponent.save();
    ctx.body = savedComponent;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const deleteAll = async (ctx: ParameterizedContext) => {
  try {
    const deletedAll = await Component.deleteMany({});
    ctx.body = deletedAll;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const deleteById = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;
  try {
    const component = await Component.findById(id);
    if (component) {
      const deletedComponent = component.remove();
      ctx.body = deletedComponent;
    } else {
      ctx.body = "ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

const updateComponent = (update: any, component: ComponentModel) => {
  if (update.name) {
    component.name = update.name;
  }
  if (update.description) {
    component.description = update.description;
  }
  if (update.status) {
    component.status = update.status;
  }
};

export const update = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;
  try {
    const component = await Component.findById(id);
    if (component) {
      const componentUpdate = ctx.request.body;
      updateComponent(componentUpdate, component);
      const updatedComponent = await component.save();
      ctx.body = updatedComponent;
    } else {
      ctx.body = "ID not found.";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
};

export const updateStatus = async (status: Status, id: string) => {
  try {
    const component = await Component.findById(id);
    if (component) {
      component.status = status;
      await component.save();
      return "ok";
    }
    return "Component not found.";
  } catch (error) {
    return error;
  }
};
