import mongoose from "mongoose";
import configs from "@configs/index";

const {
  app: { env },
  mongo: { host, port, name, username, password },
} = configs;

const connectString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;
import { countConnect } from "@helpers/check-connect";
const MAX_POLL_SIZE = 50;
const TIME_OUT_CONNECT = 3000;

mongoose.set("strictQuery", true);

class Database {
  static instance: Database;

  constructor() {
    this.connect();
  }

  // connect
  connect() {
    if (env) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        serverSelectionTimeoutMS: TIME_OUT_CONNECT,
        maxPoolSize: MAX_POLL_SIZE,
      })
      .then((_: typeof mongoose) => {
        try {
          countConnect();
        } catch (e) {
          console.log(e);
        }
        (_: any) => console.log(`Connected mongodb success `);
      })
      .catch((err) => console.log(`Error connect!`));

    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected to db success");

      // insert sql ...
    });
    mongoose.connection.on("error", (err) => {
      console.error("Mongodb connected to db error" + err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb disconnected db success");
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
export default instanceMongoDb;
