const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const Store = require('electron-store');

const store = new Store();
console.log("this is our store length",Object.keys(store.store).length)
console.log("This is our store", store.store)
if(Object.keys(store.store).length === 0)
{
  store.store = {savedData:{
    },
    loadouts:{
    }
  }
}
console.log("this is the store",store.store)
console.log(store.path)

try {
  require('electron-reloader')(
      module,
      {
        debug: true, 
        watchRenderer: true, 
        ignore: [/node_modules|[\/\\]\./,/savedData|[\/\\]\./],
        argv: []
      }
    )
} catch (_) {}


let mainWindow;
function createWindow() {
mainWindow = new BrowserWindow({ width: 900, height: 680,webPreferences: {
  nodeIntegration: true,
  enableRemoteModule: true,
} });
mainWindow.loadURL(
isDev
? "http://localhost:3000"
: `file://${path.join(__dirname, "../build/index.html")}`
);

mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});
app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});