#!/usr/bin/env node

const liwc = require('./liwc.js');
let a = liwc.fromText("anxious");

let feelings = [];
for (let i in a) {
    if (a[i] === 1) {
        feelings.push(i);
    }
}

console.log(feelings)