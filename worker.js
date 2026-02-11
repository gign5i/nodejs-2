const { parentPort, workerData } = require('worker_threads');
const { findSpecialNumbers } = require('./findSpecialNumbers');

parentPort.postMessage(findSpecialNumbers(workerData));