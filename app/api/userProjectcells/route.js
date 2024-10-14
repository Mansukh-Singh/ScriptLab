import { NextResponse } from "next/server"
import userName from "../server/models/UserProject"

export async function POST(req, res) {  
    let data = await req.json()
    let userProject = await userName(data.collectionName)
    let documents = await userProject.find({projectname:data.projectName})
    return NextResponse.json({ documents: documents})
}

export async function GET(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}

export async function DELETE(req, res) {
    return NextResponse.json({ message: 'Hello from DELETE' })
}

export async function PUT(req, res) {
    let data = await req.json()
    let userProject = await userName(data.collectionName)
    await userProject.updateOne({projectname:data.projectname},{ $set: { cells: data.textArea } })
    return NextResponse.json({ message: 'Hello from PUT' })
}