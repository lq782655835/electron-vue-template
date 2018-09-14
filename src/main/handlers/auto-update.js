import { app, autoUpdater } from 'electron-updater'

const log = require('electron-log')
autoUpdater.logger = log
autoUpdater.allowPrerelease = true
autoUpdater.fullChangelog = true

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
