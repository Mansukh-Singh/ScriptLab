"use server"
import mongoose from "mongoose";

let userDataConnection;

const connectToDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    const connectionString = 'mongodb://localhost:27017/userData';
    userDataConnection = await mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to userData")
    return userDataConnection;
  };

export default connectToDatabase;