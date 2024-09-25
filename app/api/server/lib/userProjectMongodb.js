"use server"
import mongoose from "mongoose";

let userProjectConnection;

const connectToUserProjectDatabase = async () => {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      const connectionString = 'mongodb://localhost:27017/userProject';
      let userProjectConnection = await mongoose.createConnection(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to userProject")
      return userProjectConnection;
    };
  
export default connectToUserProjectDatabase;