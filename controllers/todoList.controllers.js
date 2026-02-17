import { TodoList } from "../models/todoList.models.js";
import { TodoListItem } from "../models/todoListItem.models.js";
import { User } from "../models/user.models.js";


export const registerTodoList = async (req, res) => {
    try {
        let { title, owner } = req.body;

        if (!title) title = "No Title";

        if (!owner) {
            return res.status(400).json({ message: "Owner needed" });
        }

        const todoListData = await TodoList.create({
            title,
            owner
        });

        const list = todoListData.toObject();
        delete list.__v;

        return res.status(201).json({
            message: "Todo List registered successfully!!",
            todoListData: list
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const deleteTodoList = async (req, res) => {
    try {
        let { listId } = req.params;

        const todoList = await TodoList.findById(listId);

        if (!todoList) {
            return res.status(404).json({
                message: "Todo list not found"
            });
        }

        await TodoListItem.deleteMany({ todoList: listId });

        await TodoList.findByIdAndDelete(listId);

        return res.status(200).json({
            message: "Todo list and its items deleted successfully"
        });
    }

    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


export const updateTodoList = async (req, res) => {
    try {
        let { listId } = req.params;
        let updateListData = req.body;

        let updatedListData = await TodoList.findByIdAndUpdate(listId, updateListData, { new: true });

        if (!updatedListData) {
            return res.status(404).json({
                message: "Error while updating list data, please check of id of the list."
            });
        }

        return res.status(200).json({
            message: "Todo list data updated successfully",
            updatedList: updatedListData
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


// returns all todo lists that belongs to a given user (userId provided in params)
export const getTodoLists = async (req, res) => {
    try {
        let { userId } = req.params;

        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let todoLists = await TodoList
            .find({ owner: userId })
            .sort({ createdAt: -1 })
            .select("-__v");

        todoLists = await Promise.all(
            todoLists.map(async (list) => {
                const items = await TodoListItem
                    .find({ todoList: list._id })
                    .sort({ createdAt: 1 })
                    .select("-__v");

                return {
                    ...list.toObject(),
                    items
                };
            })
        );

        return res.status(200).json({
            message: "Todo lists fetched successfully",
            todoLists
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


