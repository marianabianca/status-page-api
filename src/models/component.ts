import { Schema, model } from "mongoose";

export const ComponentSchema = new Schema({
  name: { type: String, required: true },
});

const Component = model("Component", ComponentSchema);
export default Component;
