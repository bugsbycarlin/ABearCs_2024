//
// preload.js is glue to allow the app's javascript environment to communicate with the
// electron wrapper's javascript environment in a sandboxed manner.
//
// Copyright 2021 Alpha Zoo LLC.
// Written by Matthew Carlin
//

const { ipcRenderer } = require('electron')
