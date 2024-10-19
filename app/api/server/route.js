import { NextResponse } from "next/server"
import User from "./models/User"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Replace '*' with your specific domain if needed
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT', // Specify allowed methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Specify allowed headers
};

// Handle CORS preflight requests
export async function OPTIONS(req) {
    return NextResponse.json({}, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function POST(req, res) {
    let data = await req.json()
    if (data.name === "signup") {
        const newUser = new User(
            {
                username: data.Username,
                password: data.Password,
                islogin: false
            }
        )
        try {
            await newUser.save()
            return NextResponse.json({ message: "User Successfully Registered" }, {
                headers: corsHeaders
            })
        }
        catch (error) {
            return NextResponse.json({ message: "Username Already Exists" }, {
                headers: corsHeaders
            })
        }
    }

    if (data.name === "login") {
        try {
            const existUser = await User.findOne({ username: data.Username })
            if (!existUser) {
                return NextResponse.json({ message: "Username Does'nt Exists" }, {
                    headers: corsHeaders
                })
            }
            if (data.Password !== existUser.password) {
                return NextResponse.json({ message: "Incorrect Password" }, {
                    headers: corsHeaders
                })
            }
            if (data.Username === existUser.username && data.Password === existUser.password) {
                await User.updateOne({ username: data.Username }, { $set: { islogin: true } })
                return NextResponse.json({ message: "Logged In", username: data.Username }, {
                    headers: corsHeaders
                })
            }
        }
        catch (error) {
            return NextResponse.json({ message: "error" }, {
                headers: corsHeaders
            })
        }
    }
    return NextResponse.json({ message: 'Successfully Registered' }, {
        headers: corsHeaders
    })
}

export async function GET(req, res) {
    let trueUser = await User.findOne({ islogin: true })
    if (trueUser == null) {
        return NextResponse.json({ message: false }, {
            headers: corsHeaders
        })
    }
    else {
        return NextResponse.json({ message: trueUser.islogin, username: trueUser.username }, {
            headers: corsHeaders
        })
    }
}

export async function DELETE(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' }, {
        headers: corsHeaders
    })
}

export async function PUT(req, res) {
    let data = await req.json()
    await User.updateOne({ username: data.Username }, { $set: { islogin: false } })
    return NextResponse.json({ message: 'Hello from PUT' }, {
        headers: corsHeaders
    })
}