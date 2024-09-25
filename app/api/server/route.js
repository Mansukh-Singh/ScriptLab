import { NextResponse } from "next/server"
import User from "./models/User"

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
            return NextResponse.json({ message: "User Successfully Registered"})
        }
        catch (error) {
            return NextResponse.json({ message: "Username Already Exists"})
        }
    }

    if (data.name === "login") {
        try {
            const existUser = await User.findOne({username:data.Username})
            if (!existUser) {
               return NextResponse.json({ message: "Username Does'nt Exists"}) 
            }
            if (data.Password !== existUser.password) {
                return NextResponse.json({ message: "Incorrect Password"})
            }
            if (data.Username === existUser.username && data.Password === existUser.password) {
                await User.updateOne({username:data.Username},{ $set: { islogin: true } })
                return NextResponse.json({ message: "Logged In" , username: data.Username})
            }
        }
        catch (error) {
            return NextResponse.json({ message: "error"})
        }
    }
    return NextResponse.json({ message: 'Successfully Registered' })
}

export async function GET(req, res) {
    let trueUser = await User.findOne({islogin:true})
    if (trueUser == null) {
        return NextResponse.json({ message:false })
    }
    else {
        return NextResponse.json({ message: trueUser.islogin, username: trueUser.username })
    }
}

export async function DELETE(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}

export async function PUT(req, res) {
    let data = await req.json()
    await User.updateOne({username:data.Username},{ $set: { islogin: false } })
    return NextResponse.json({ message: 'Hello from PUT' })
}