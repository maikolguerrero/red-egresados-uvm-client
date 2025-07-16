import { VITE_NODE_ENV } from '../config';
const logLevels = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};

//   const shouldLog = (level) => {
//     const currentEnv = import.meta.env.VITE_NODE_ENV || 'development';
//     const minLevel = currentEnv === 'production' ? logLevels.WARN : logLevels.DEBUG;

//     return Object.values(logLevels).indexOf(level) >= 
//            Object.values(logLevels).indexOf(minLevel);
//   };

const dev = VITE_NODE_ENV ==='development';

const logger = {
    log: (...args) => {
        if (dev) {
            console.log('[LOG]', ...args);
        }
    },

    info: (...args) => {
        if (dev) {
            console.info('[INFO]', ...args);
        }
    },

    warn: (...args) => {
        if (dev) {
            console.warn('[WARN]', ...args);
        }
    },

    error: (...args) => {
        if (dev) {
            console.error('[ERROR]', ...args);
        }
    }
};

export default logger;