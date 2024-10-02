"use server"
import React from 'react'

const runProgram = (text) => {
    try {
        const output = eval(text)
        console.log(output)
    }
    catch (error) {
        console.log(error.name,':',error.message,':',error.stack)
    }
}

export default runProgram