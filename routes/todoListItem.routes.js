import express from "express";
import { registerTodoListItem, deleteTodoListItem, updateTodoListItem } from "../controllers/todoListItem.controllers.js";
import { authenticateUser } from "../middlewares/authenication.middlewares.js";
import { authorizeByItemId, authorizeItemRegistration } from "../middlewares/authorize.middlewares.js";


const router = express.Router();

router.post( '/register', authenticateUser, authorizeItemRegistration, registerTodoListItem );

router.delete( '/:itemId', authenticateUser, authorizeByItemId, deleteTodoListItem );

router.patch('/:itemId', authenticateUser, authorizeByItemId, updateTodoListItem);

export default router;



