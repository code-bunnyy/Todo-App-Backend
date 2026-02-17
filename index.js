import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// importing routes
import userRoutes from './routes/user.routes.js';
import todoListRoutes from './routes/todoList.routes.js';
import todoListItemRoutes from './routes/todoListItem.routes.js';


// Load environment variables
dotenv.config();

// Defining port for the application
const port = process.env.PORT || 5000;


// Initialize express app
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/users", userRoutes);

app.use("/api/todo-lists", todoListRoutes);

app.use("/api/todo-list-items", todoListItemRoutes);


// server starts once database is connected
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});


