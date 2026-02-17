import mongoose from 'mongoose';

const todoItemSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        todoList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TodoList',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

export const TodoListItem = mongoose.model('TodoListItem', todoItemSchema);
