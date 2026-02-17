import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required!!"],
            unique: true,
            lowercase: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, "name is required!!"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "e-mail is required!!"],
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
