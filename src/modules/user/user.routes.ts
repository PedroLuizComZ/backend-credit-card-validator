import express from "express";
import { authenticate } from "../../common/middleware/auth";
import userController from "./user.controller";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", authenticate, userController.getAllUsers);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
