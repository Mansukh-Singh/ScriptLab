"use server"
import React from 'react';
import { exec } from 'child_process';
import fs from 'fs';

const runProgram = (jsCode) => {
    fs.writeFile('./app/dashboard/[slug]/project/[project]/myScript.js', jsCode, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
    });
  
    return new Promise((resolve, reject) => {
      exec('node ./app/dashboard/[slug]/project/[project]/myScript.js', (err, stdout, stderr) => {
        if (err) {
          console.error('Error executing the file:', err);
          resolve(`${err.name}: ${err.message}`);
        }
        else{
          resolve(stdout);
        }
      });
    });
  };
  

export default runProgram;
