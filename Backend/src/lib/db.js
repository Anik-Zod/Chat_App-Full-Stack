import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Try connecting to MongoDB
    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If successful, log the connection details
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    // Log specific error messages
    console.error("❌ MongoDB connection failed");

    if (error.message.includes("ECONNREFUSED")) {
      console.error("Connection Refused: Make sure your MongoDB server is running.");
    } else if (error.message.includes("timeout")) {
      console.error("Connection Timeout: The connection to MongoDB timed out. Check your network or MongoDB instance status.");
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
};

export default connectDB;
