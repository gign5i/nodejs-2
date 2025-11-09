const { findSpecialNumbers } = require('./findSpecialNumbers');
const { ARRAY_LENGTH, KIR_LENGTH } = require('./constants');
const { separateArray } = require('./separateArray');
const { Worker } = require('worker_threads');

const { PerformanceObserver, performance } = require('perf_hooks');
const { boolean } = require('zod');
const { resolve } = require('path');

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().map((element) => 
    console.log(`| Test Measure - ${element.name} | Duration - ${element.duration} |`))
})

performanceObserver.observe({ entryTypes: ['measure'] });

const FIRST_ARRAY = Array.from({length: ARRAY_LENGTH}, (_, index) => index);

function firstFunc() {
  performance.mark('start');
  const result = findSpecialNumbers(FIRST_ARRAY);
  performance.mark('end');
  performance.measure('test-1', 'start', 'end');
  console.log('Result: ', result);
}

function secondFunc() {
  performance.mark('start');
  const groupedArrays = separateArray(FIRST_ARRAY, KIR_LENGTH);

  const newPromise = groupedArrays.filter((group) => group.length > 0).map((group, idx) => {

    return new Promise((resolve) => {
    const worker = new Worker('./worker', {
      workerData: group,
    });
    worker.on('message', (message) => {
      console.log(`worker - ${idx + 1}: `, message)
      resolve(message);
    });
    })
  });


  Promise.all(newPromise).then((result) => {
    performance.mark('end');
    performance.measure('test-2', 'start', 'end');
    console.log('Result: ', result.reduce((acc, value) => acc + value, 0));
  })
}


function main () {
  firstFunc();
  secondFunc();
}

main();