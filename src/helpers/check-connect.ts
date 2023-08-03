import mongoose from "mongoose";
import os from "os";
import process from "process";
const SECONDS = 5000;

// count connect
export const countConnect = () => {
  const numOfConnect: number = mongoose.connections.length;
  console.log(`Number of connections: ${numOfConnect}`);
};

// check over load connect
export const checkOverload = () => {
  setInterval(() => {
    const numConnection: number = mongoose.connections.length;
    const numCores: number = os.cpus().length;
    const memoryUse: number = process.memoryUsage().rss;
    // server chiu dk 5 connect
    const maxConnections = numCores * 5;

    if (numConnection > maxConnections) {
      console.log(`Active connections: ${numConnection}`);
      console.log(`Memory usage:: ${memoryUse / 1024 / 1024} MB`);
      console.log(`Connection overload detected!`);
      // notify.send(....)
    }
  }, SECONDS);
};
