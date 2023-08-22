import logger, { transport } from "pino";
import moment from "moment";

export default logger(
  {
    base: {
      pid: false,
    },
    level: "debug",
    timestamp: () => `,"time":"${moment().format("DD/MM/YYYY HH:mm")}"`,
  },
  transport({
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  })
);
