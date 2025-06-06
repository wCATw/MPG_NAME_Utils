import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'app.log' }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' }
    }
});

const logger = log4js.getLogger();

export default logger;
