import { ParameterizedContext } from "koa";

import Component from "../models/component";

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
