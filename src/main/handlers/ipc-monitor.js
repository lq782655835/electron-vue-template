import { ipcMain } from 'electron'
import { getCurrentWin, closeWindow, minimizeWindow, maximizeWindow } from './utils'
import { IPC_RENDERER_SIGNAL } from '../../renderer/utils/config'

ipcMain.on(IPC_RENDERER_SIGNAL.MAXIMIZE, e => (e.returnValue = maximizeWindow()))
ipcMain.on(IPC_RENDERER_SIGNAL.CLOSE, e => closeWindow())
ipcMain.on(IPC_RENDERER_SIGNAL.MINIMIZE, e => minimizeWindow())
ipcMain.on(IPC_RENDERER_SIGNAL.SET_LOGIN_SIZE, (event, arg) => {
    let mainWindow = getCurrentWin()
    mainWindow.setSize(550, 350)
    mainWindow.center()
})

ipcMain.on(IPC_RENDERER_SIGNAL.SET_MAIN_SIZE, (event, arg) => {
    let mainWindow = getCurrentWin()
    mainWindow.setSize(1200, 180)
    mainWindow.center()
})

ipcMain.on(IPC_RENDERER_SIGNAL.TRANSPARENT, (event, arg) => {
    let mainWindow = getCurrentWin()
    mainWindow.setOpacity(0.8)
})

ipcMain.on(IPC_RENDERER_SIGNAL.OPAQUE, (event, arg) => {
    let mainWindow = getCurrentWin()
    mainWindow.setOpacity(1)
})
