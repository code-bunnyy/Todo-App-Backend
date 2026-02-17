
import { User } from '../models/user.models.js';
import { TodoList } from '../models/todoList.models.js';
import { TodoListItem } from '../models/todoListItem.models.js';


export const registerUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
            });
        }

        const username = email;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                message: "User already registered",
                user: existingUser,
            });
        }

        // Create new user
        const user = await User.create({
            username,
            name,
            email,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



export const deleteUser = async (req, res) => {
    try {
        let { userId } = req.params;

        let userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        let ownedListIds = await TodoList
            .find({ owner: userId })
            .distinct("_id");

        await TodoListItem.deleteMany({ todoList: { $in: ownedListIds } });

        await TodoList.deleteMany({ owner: userId });

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "User and user's data deleted successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}



export const updateUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let updateData = req.body;

        let userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (updateData.username) {
            const usernameUser = await User.findOne({ username: updateData.username });

            if (usernameUser && usernameUser._id.toString() !== userId) {
                return res.status(409).json({
                    message: "username already taken"
                })
            }
        }

        if (updateData.email) {
            const emailUser = await User.findOne({ email: updateData.email });

            if (emailUser && emailUser._id.toString() !== userId) {
                return res.status(409).json({
                    message: "email already in use"
                })
            }
        }


        let updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        return res.status(200).json({
            message: "User data updated successfully",
            user: updatedUser
        })

    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}




export const getUser = async (req, res) => {
    try {
        let { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                message: "UserId is required"
            });
        }

        const userData = await User.findOne({ _id: userId }).select("-__v");

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User data fetched successfully",
            userData
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}



