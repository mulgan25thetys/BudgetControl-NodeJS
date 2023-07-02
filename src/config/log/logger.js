var log4js = require('log4js')
log4js.configure({
    appenders: {
        logger: {
            type: 'file',
            filename: 'logger.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true
        }
    },
  categories: { default: { appenders: ['logger'], level: 'debug' } }
})
var logger = log4js.getLogger()

module.exports = (level, message, args) => {
    logger.level = !['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(level) ? 'trace' : level

    switch (logger.level) {
        case 'fatal':
            logger.fatal(message, args)
            break
        case 'error':
            logger.error(message, args)
            break
        case 'warn':
            logger.warn(message, args)
            break
        case 'info':
            logger.info(message, args)
            break
        case 'debug':
            logger.debug(message, args)
            break
        default:
            logger.trace(message, args)
            break
    }
}
