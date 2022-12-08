import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";

export default defineNuxtPlugin(() => {
  const transports: winston.LoggerOptions["transports"] = [
    new winston.transports.Console(),
  ];

  if (process.env.STREAM_LOG_TO_GCP) {
    transports.push(new LoggingWinston());
  }

  const logger = winston.createLogger({
    level: "info",
    transports,
  });

  return {
    provide: {
      logger,
    },
  };
});
