const { electron, app, BrowserWindow } = require('electron');
const {readFileSync, writeFileSync } = require('fs')
const fetch = require('cross-fetch')
const discord = require('./discord')
const obs = require('./obs')
const { ElectronBlocker, fullLists} = require('@cliqz/adblocker-electron')


async function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      nodeIntegrationInSubFrames: true,
      },
    autoHideMenuBar: true,
    frame: true,
    fullscreen: false,
    width: 530,
    height: 763,
    maximizable: false,
    darkTheme: true,
    roundedCorners: true,
    center: true
  });
  const blocker = await ElectronBlocker.fromLists(
    fetch,
    fullLists,
    {
      enableCompression: true,
    },
    {
      path: 'engine.bin',
      read: async (...args) => readFileSync(...args),
      write: async (...args) => writeFileSync(...args),
    },
  );
  blocker.enableBlockingInSession(mainWindow.webContents.session);

  blocker.on('request-blocked', (request) => {
    console.log('blocked', request.tabId, request.url);
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    console.log("popup blocked")
  })

  const contents = mainWindow.webContents;

  contents.on('did-finish-load', () => {
    contents.insertCSS('@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap") ;html, body { background-color: #171717 !important; font-family: "Roboto", sans-serif !important;} #info{opacity: 0%} div{color: white} #list{background-color: #171717 !important} #list{color: white !important}')
  })


  mainWindow.loadURL("https://youtube-playlist-randomizer.bitbucket.io/?bgcolor=white")
  mainWindow.setTitle('Youtube Playlist Randomizer')
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
    
  mainWindow.setIcon('./assets/ytpr.ico');
}


app.on('ready', () => {
  createWindow();
  discord(mainWindow);
  
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const InfiniteLoop = require('infinite-loop');
let il = new InfiniteLoop;
function discordrpc() {
  discord(mainWindow);
  obs(mainWindow);
}


il.add(discordrpc, []);
il.setInterval(2000)
il.run();