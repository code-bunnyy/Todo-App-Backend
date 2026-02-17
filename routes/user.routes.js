import express from "express";
import { registerUser, deleteUser, updateUser, getUser } from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/authenication.middlewares.js";
import { authorizeByUserId } from "../middlewares/authorize.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);

router.delete( "/:userId", authenticateUser, authorizeByUserId, deleteUser );

router.patch("/:userId", authenticateUser, authorizeByUserId, updateUser);

router.get('/:userId', authenticateUser, authorizeByUserId, getUser);

export default router;