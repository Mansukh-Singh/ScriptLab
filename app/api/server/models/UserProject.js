import mongoose from 'mongoose'
import connectToUserProjectDatabase from '../lib/userProjectMongodb';

const userFolderSchema = new mongoose.Schema({
    projectname: {
        type: String,
        unique: true
    },
    cells: {
        type: [String]
    }
});


const userName = async (username) => {
    console.log("USERNAME:",username)
    let userProjectConnection = await connectToUserProjectDatabase()
    return userProjectConnection.models[username] || userProjectConnection.model(username, userFolderSchema);
}

export default userName;