import log4js from "log4js";

const config = {
    appenders: {
        console: {
            type: "console",
            pattern: "%d{dd/MM/yyyy-hh:mm:ss} [%p] %m%n",
        },
        file: {
            type: "file",
            filename: "./src/logs/logs.log",
            pattern: "%d{dd/MM/yyyy-hh:mm:ss} [%p] %m%n",
        },
    },
    categories: {
        default: { appenders: ["console", "file"], level: "info" },
        error: { appenders: ["file"], level: "error" }
    },
};

log4js.configure(config);

export default log4js;