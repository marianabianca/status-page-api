import { Schema, model } from "mongoose";

export const IncidentSchema = new Schema({
  status: { type: String, required: true },
});

const Incident = model("Incident", IncidentSchema);
export default Incident;
