import winston from "winston";

export default defineNuxtPlugin(async () => {
  const transports: winston.LoggerOptions["transports"] = [
    new winston.transports.Console(),
  ];

  if (process.env.STREAM_LOG_TO_GCP) {
    const { LoggingWinston } = await import("@google-cloud/logging-winston");
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
