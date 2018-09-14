const log = require('electron-log')

log.transports.file.level = 'info'
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}'
log.transports.file.maxSize = 5 * 1024 * 1024
log.transports.console.level = false
