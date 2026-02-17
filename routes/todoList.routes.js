import express from "express";
import { registerTodoList, deleteTodoList, updateTodoList, getTodoLists } from "../controllers/todoList.controllers.js";
import { authenticateUser } from "../middlewares/authenication.middlewares.js";
import { authorizeByUserId, authorizeByListId, authorizeListRegistration } from "../middlewares/authorize.middlewares.js";


const router = express.Router();

router.post( '/register', authenticateUser, authorizeListRegistration, registerTodoList );

router.delete( '/:listId', authenticateUser, authorizeByListId, deleteTodoList );

router.patch( '/:listId', authenticateUser, authorizeByListId, updateTodoList );

router.get( '/:userId', authenticateUser, authorizeByUserId, getTodoLists );


export default router;



