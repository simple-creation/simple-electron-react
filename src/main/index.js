// import { BrowserWindow, app, ipcMain } from 'electron';
// import path from "path";
//import { add } from '~build/Release/addon.node';
//import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF } from 'electron-devtools-installer';
// @ts-ignore

const { BrowserWindow, app, ipcMain } = require('electron');
const path = require("path");


function loadHtml(window, name) {
  if (process.env.NODE_ENV === 'production') {
    window.loadFile(path.resolve(__dirname, `../../build/${name}.html`)).catch(console.error);
    return;
  }
  // 开发模式
  window.loadURL(`http://localhost:8080/${name}.html`).catch(console.error);
}

let mainWindow = null;

let userInfoWidget = null;

ipcMain.handle('open-user-info-widget', () => {
  createUserInfoWidget();
});

ipcMain.handle('calc-value', (event, a, b) => {
  //console.log(add(+a, +b));
  //return add(+a, +b);
})


function createMainWindow() {
  if (mainWindow) return;
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    frame: true,
    backgroundColor: '#333544',
    minWidth: 450,
    minHeight: 350,
    // height: 350,
    // width: 450
  });

  loadHtml(mainWindow, 'index');
  mainWindow.on('close', () => mainWindow = null);
  mainWindow.webContents.on('crashed', () => console.error('crash'));
  //require('devtron').install();
}

function createUserInfoWidget() {
  if (userInfoWidget) return;
  if (!mainWindow) return;
  userInfoWidget = new BrowserWindow({
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true
    },
    frame: true,
    backgroundColor: '#333544',
    minWidth: 250,
    minHeight: 300,
    height: 300,
    width: 250
  });
  loadHtml(userInfoWidget, 'userInfo');
  userInfoWidget.on('close', () => userInfoWidget = null);
  userInfoWidget.webContents.on('crashed', () => console.error('crash'));
}

app.on('ready', () => {
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  createMainWindow();
});
app.whenReady().then(() => {
  //installExtension([REACT_PERF, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]).then(() => {});
});