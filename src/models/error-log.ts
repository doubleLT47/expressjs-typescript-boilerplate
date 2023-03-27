import { ILogError } from "./../interfaces/log-error";
import mongoose, { Schema } from "mongoose";

const logErrorChema = new mongoose.Schema<ILogError>({
  param: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MLogError = mongoose.model<ILogError>("topic", logErrorChema);

export default MLogError;
