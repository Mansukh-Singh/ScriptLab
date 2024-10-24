"use server"
import mongoose from "mongoose";

let userDataConnection;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  // const connectionString = 'mongodb://localhost:27017/userData';
  const connectionString = process.env.MONGODB_URI_USERDATA
  console.log(typeof process.env.MONGODB_URI_USERDATA)
  userDataConnection = await mongoose.createConnection(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to userData")
  return userDataConnection;
};

export default connectToDatabase;