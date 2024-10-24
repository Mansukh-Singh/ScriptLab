"use server"
import mongoose from "mongoose";

const connectToUserProjectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  // const connectionString = 'mongodb://localhost:27017/userProject';
  const connectionString = process.env.MONGODB_URI_USERPROJECT
  console.log(typeof process.env.MONGODB_URI_USERPROJECT)
  let userProjectConnection = await mongoose.createConnection(connectionString, {
    // serverSelectionTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to userProject")
  return userProjectConnection;
};

export default connectToUserProjectDatabase;