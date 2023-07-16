import { join } from 'path';
import { app, BrowserWindow } from 'electron';

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const args = process.argv.slice(1);
const isServeMode = args.some(arg => arg === '--serve');

const createWindow = (): void => {
  const window = new BrowserWindow({
    width: 1100,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  if (isServeMode) {
    window.loadURL('http://localhost:4200');
  } else {
    const file = join(__dirname, '../renderer/electron-tools/index.html');

    window.loadURL(`file://${file}`);
  }

  window.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
