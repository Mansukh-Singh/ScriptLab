// "use server"
// import React from 'react';
// import { exec } from 'child_process';
// import fs from 'fs';

// const runProgram = (jsCode) => {
//     fs.writeFile('./app/dashboard/[slug]/project/[project]/myScript.js', jsCode, (err) => {
//       if (err) {
//         console.error('Error writing file:', err);
//         return;
//       }
//     });
  
//     return new Promise((resolve, reject) => {
//       exec('node ./app/dashboard/[slug]/project/[project]/myScript.js', (err, stdout, stderr) => {
//         if (err) {
//           console.error('Error executing the file:', err);
//           resolve(`${err.name}: ${err.message}`);
//         }
//         else{
//           resolve(stdout);
//         }
//       });
//     });
//   };
  

// export default runProgram;
"use server"
import React from 'react';

const runProgram = (jsCode) => {
  return new Promise((resolve, reject) => {
    try {
      let output = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        output += args.join(' ') + '\n'; 
      };
      const result = eval(jsCode);
      console.log = originalConsoleLog;
      const finalOutput = output || result?.toString() || "";
      resolve(finalOutput);
    } catch (err) {
      console.error('Error executing code:', err);
      const errorLine = err.stack.split('\n')[1];
      resolve(`${err.name}: ${err.message}`);
    }
  });
};

export default runProgram;


