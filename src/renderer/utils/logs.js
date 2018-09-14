import { isDev } from '@/utils/config'
var log = require('electron-log/renderer')

const errorHandle = msg => {
    msg = _isString(msg) ? msg : JSON.stringify(msg)
    log.info(msg)
}

const _isString = str => typeof str === 'string'

window.onerror = (msg, url, lineNo, columnNo, error) => {
    let result = ''

    if (msg.toLowerCase().indexOf('substring') > -1) {
        result = 'Script Error: See Browser Console for Detail'
    } else {
        result = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ')
    }

    if (!isDev) {
        errorHandle(result)
        return true // 阻止浏览器冒泡，不显示报错
    } else {
        console.log(result)
        return false
    }
}
export default errorHandle
