#!/usr/bin/env node

const HolidayAPI = require('node-holidayapi');
const util = require('util');
const hapi = new HolidayAPI('ee09d3cc-fc01-4e5a-9a57-759cb16fa78a').v1;
const date = new Date();
const exec = require('child_process').exec;
var parameters = {
  // Required
  country: 'US',
  year:    date.getYear(),
  // Optional
  month:    date.getMonth()+1,
  day:      date.getDate(),
  // previous: true,
  // upcoming: true,
  // public:   true,
  // pretty:   true,
};

hapi.holidays(parameters, function (err, data) {
    if(err) {
        console.log("err: " + err);
    }
    var name = data.holidays[0].name;
    name = name.replace(/'/, "\\\'");   // Escape ' with \'
    console.log("name: " + name);
  
   exec("the_matrix_scrolltext Happy " + name, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    if(stdout) {
        console.log(`stdout: ${stdout}`);
    }
    if(stderr) {
        console.log(`stderr: ${stderr}`);
    }
    });
});