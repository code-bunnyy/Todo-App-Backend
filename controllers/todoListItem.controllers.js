import { TodoListItem } from "../models/todoListItem.models.js";


export const registerTodoListItem = async (req, res) => {
    try {
        let { text, completed = false, todoList } = req.body;

        if (!text || text.trim() === "" || !todoList) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const todoListItemData = await TodoListItem.create({
            text,
            completed,
            todoList
        });

        return res.status(201).json({
            message: "Todo List Item registered successfully!!",
            todoListItemData
        });
    }

    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const deleteTodoListItem = async (req, res) => {
    try {
        let { itemId } = req.params;

        const deletedTodoListItem = await TodoListItem.findByIdAndDelete(itemId);

        if (!deletedTodoListItem) {
            return res.status(404).json({
                message: "Todo list item not found!!"
            });
        }

        return res.status(200).json({
            message: "Todo list item deleted successfully!!"
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


export const updateTodoListItem = async (req, res) => {
    try {
        let { itemId } = req.params;
        let updateItem = req.body;

        let itemData = await TodoListItem.findById(itemId);

        if (!itemData) {
            return res.status(404).json({
                message: "Todo list item not found"
            });
        }

        if (
            updateItem.text !== undefined &&
            updateItem.text.trim() === ""
        ) {
            return res.status(400).json({
                message: "Todo text cannot be empty"
            });
        }

        let updatedItem = await TodoListItem.findByIdAndUpdate(itemId, updateItem, { new: true });

        return res.status(200).json({
            message: "Todo list item updated successfully",
            todoListItem: updatedItem
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


