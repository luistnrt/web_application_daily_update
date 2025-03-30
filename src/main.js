const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false, // Borderless window
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("src/index.html");

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
