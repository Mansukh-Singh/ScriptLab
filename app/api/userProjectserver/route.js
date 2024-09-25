import { NextResponse } from "next/server"
import userName from "../server/models/UserProject"

export async function POST(req, res) {
    let data = await req.json()
    console.log(data.collectionName)
    let userProject = await userName(data.collectionName)
    let documents = await userProject.find()
    return NextResponse.json({ documents: documents})
}

export async function GET(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}

export async function DELETE(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}

export async function PUT(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}