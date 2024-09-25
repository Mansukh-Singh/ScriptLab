import mongoose from 'mongoose'
import connectToDatabase from '../lib/mongodb';

let userDataConnection = await connectToDatabase()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    islogin: {
        type: Boolean,
        required: true
    },
});

const User = userDataConnection.models.User || userDataConnection.model('User', userSchema);

export default User;