'use strict'

import { app, BrowserWindow } from 'electron'
import './handlers/ipc-monitor' /* 进程消息监听 */
// import './handlers/logs' /* 日志设置 */
import { registerGlobalDevToolsShortCut } from './handlers/utils'
import { isDev } from '../renderer/utils/config'

let mainWindow
const winURL = isDev ? `http://localhost:9081` : `file://${__dirname}/index.html`
!isDev &&
    (global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\'))

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 350,
        width: 550,
        useContentSize: true,
        resizable: isDev,
        alwaysOnTop: !isDev,
        transparent: true,
        frame: false,
        center: true
    })
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => (mainWindow = null))

    isDev && registerGlobalDevToolsShortCut() // 注册调试快捷键
}

app.on('ready', createWindow)
app.on('activate', () => !mainWindow && createWindow())
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
