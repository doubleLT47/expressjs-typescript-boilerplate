import mongoose from "mongoose";
import { env } from "../index";

const connect = async () => {
  try {
    const url = `mongodb://${env.MONGODB_USER}:${env.MONGODB_PWD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/?authSource=admin`;

    await mongoose.connect(url);
    console.info(`---------------------------------`);
    console.info(`🚀 Connect to mongodb success`);
    console.info(`---------------------------------`);
  } catch (e) {
    console.info(`---------------------------------`);
    console.info(`Connect to mongodb failure`);
    console.info(`---------------------------------`);
  }
};

export default { connect };
