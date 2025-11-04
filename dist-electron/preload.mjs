"use strict";
const electron = require("electron");
console.log("preload.ts");
window.ipcRenderer = electron.ipcRenderer;
