import { ITopic } from "./../interfaces/topic";
import mongoose, { Schema } from "mongoose";

const topicChema = new mongoose.Schema<ITopic>({
  topic: { type: String, required: true },
  param: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, update: Date.now },
});

const MTopic = mongoose.model<ITopic>("topic", topicChema);

export default MTopic;
