import { TodoList } from "../models/todoList.models.js";
import { TodoListItem } from "../models/todoListItem.models.js";


export const authorizeByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (req.user.userId === userId) {
            return next();
        }

        else return res.status(403).json({
            message: "Unauthorized user",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Authorization failed",
            error: error.message,
        });
    }
}


export const authorizeByListId = async (req, res, next) => {
    try {
        const { listId } = req.params;

        const list = await TodoList.findById(listId);

        if (!list) return res.status(404).json({
            message: "List not found",
        });

        if (list.owner.toString() === req.user.userId) {
            return next();
        }
        else return res.status(403).json({
            message: "Unauthorized user",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Authorization failed",
            error: error.message,
        });
    }
}


export const authorizeByItemId = async (req, res, next) => {
    try {
        const { itemId } = req.params;

        const item = await TodoListItem.findById(itemId).populate("todoList");

        if (!item) return res.status(404).json({
            message: "List item not found",
        });

        if (!item.todoList?.owner) return res.status(404).json({
            message: "Owner data not found",
        });

        if (item.todoList.owner.toString() === req.user.userId) {
            return next();
        }
        else return res.status(403).json({
            message: "Unauthorized user",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Authorization failed",
            error: error.message,
        });
    }
}



export const authorizeListRegistration = async (req, res, next) => {
    try {
        const { owner } = req.body;

        if (!owner) return res.status(400).json({
            message: "Owner needed",
        })

        if (owner.toString() === req.user.userId) {
            return next();
        }
        else return res.status(403).json({
            message: "Unauthorized user",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Authorization failed",
            error: error.message,
        });
    }
}


export const authorizeItemRegistration = async (req, res, next) => {
    try {
        const { todoList } = req.body;

        if (!todoList) return res.status(400).json({
            message: "todoList id required",
        });

        const list = await TodoList.findById(todoList);

        if (!list) return res.status(404).json({
            message: "List this item belongs to not found",
        });

        if (list.owner.toString() === req.user.userId) {
            return next();
        }
        else return res.status(403).json({
            message: "Unauthorized user",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Authorization failed",
            error: error.message,
        });
    }
}


