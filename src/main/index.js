'use strict'

import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'

const isProduct = process.env.NODE_ENV === 'production'
let isMaximized = false // 是否最大化 // fixbug: win.isMaximized()总是返回false，故使用该参数判断 -- only windows

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:9081`
        : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 350,
        width: 550,
        useContentSize: true,
        resizable: !isProduct,
        alwaysOnTop: isProduct,
        transparent: true,
        frame: false,
        center: true
    })

    mainWindow.loadURL(winURL)

    // show devtools for debugger
    globalShortcut.register('CommandOrControl+Shift+K', () => {
        let focusWin = BrowserWindow.getFocusedWindow()
        focusWin && focusWin.toggleDevTools()
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

/**
 * 防止应用多开
 * 当进程是第一个实例时，返回false。
 * 如果是第二个实例时，返回true，并且执行第一个实例的回调函数
 */
const shouldQuit = app.makeSingleInstance((commandLine, workingDir) => {
    if (mainWindow) {
        mainWindow.isMinimized() && mainWindow.restore()
        mainWindow.focus()
    }
})
if (shouldQuit) {
    app.quit()
}

app.on('ready', () => {
    setTimeout(createWindow, 1000)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        setTimeout(createWindow, 1000)
    }
})

ipcMain.on('close', e => mainWindow.close())
ipcMain.on('minimize', e => mainWindow.minimize())
ipcMain.on('maximize', e => {
    isMaximized ? mainWindow.unmaximize() : mainWindow.maximize()
    isMaximized = !isMaximized
    e.returnValue = isMaximized
})

ipcMain.on('resize-login', (event, arg) => {
    mainWindow.setSize(550, 350)
    mainWindow.center()
})

ipcMain.on('resize-medium', (event, arg) => {
    mainWindow.setSize(1200, 180)
    mainWindow.center()
})

ipcMain.on('resize-by-font', (event, arg) => {
    console.log(arg)
    mainWindow.setSize(1200, arg)
    mainWindow.center()
})

ipcMain.on('transparent', (event, arg) => {
    mainWindow.setOpacity(0.8)
})

ipcMain.on('opaque', (event, arg) => {
    mainWindow.setOpacity(1)
})

ipcMain.on('center', (event, arg) => {
    mainWindow.center()
})
