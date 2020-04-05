import { Schema, Document, model } from "mongoose";

import { Status } from "./status.enum";

export const ComponentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: Status, required: true },
});

export interface ComponentModel extends Document {
  name: string;
  description: string;
  status: Status;
}

const Component = model<ComponentModel>("Component", ComponentSchema);
export default Component;
