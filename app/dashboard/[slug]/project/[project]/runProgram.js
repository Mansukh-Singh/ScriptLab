"use client"
import React from 'react'
import { useState } from 'react'

const runProgram = (text) => {
    try {
        const output = eval(text)
        console.log(output)
        return true
    }
    catch (error) { 
        console.log(error.name, ':', error.message)
        return false
    }
}

export default runProgram