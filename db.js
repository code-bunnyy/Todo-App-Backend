// Import mongoose to work with MongoDB
import mongoose from "mongoose";


// Async function to connect to MongoDB
const connectDB = async () => {
    try{
        // Connect using URI from .env
        await mongoose.connect( process.env.MONGO_URI );

        // Success message
        console.log("MongoDB connected successfully");
    }
    catch( error ) {
        // Log error if connection fails
        console.error("MongoDB connection failed:", error.message);

        // Exit process if DB connection fails
        process.exit(1);
    }
}


// Export the function
export default connectDB;



