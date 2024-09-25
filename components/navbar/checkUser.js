import React from 'react'

const checkUser = async () => {
    let response = await fetch('/api/server',{method:"GET",headers: {
        'Content-Type': 'application/json'
    }})
    let result = await response.json()
    return result
}

export default checkUser
