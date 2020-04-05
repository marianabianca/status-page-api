import { Schema, Document, model } from "mongoose";

import { Status } from "./status.enum";

export const IncidentSchema = new Schema({
  componentId: { type: String, required: true },
  status: { type: Status, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true },
});

export interface IncidentModel extends Document {
  componentId: string;
  status: Status;
  date: string;
  message: string;
}

const Incident = model<IncidentModel>("Incident", IncidentSchema);
export default Incident;
