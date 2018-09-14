import { BrowserWindow, globalShortcut } from 'electron'

export const getCurrentWin = () => BrowserWindow.getFocusedWindow()

export const registerGlobalDevToolsShortCut = () => {
    globalShortcut.register('CommandOrControl+Shift+K', () => {
        let focusWin = BrowserWindow.getFocusedWindow()
        focusWin.toggleDevTools()
    })
}

export const closeWindow = () => {
    let focusWin = getCurrentWin()
    focusWin && focusWin.close()
}

export const minimizeWindow = () => {
    let focusWin = getCurrentWin()
    focusWin && focusWin.minimize()
}

export const maximizeWindow = e => {
    let focusWin = getCurrentWin()
    let isMax = focusWin.isMaximized() // 不能连续执行isMaximized(),不然会carsh
    if (isMax) {
        focusWin && focusWin.unmaximize()
    } else {
        focusWin && focusWin.maximize()
    }
    return !isMax // 同步消息
}
