import { handleError } from "@/common/utils/handleError";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "./user.service";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, password, isAdmin } = req.body;
      const newUser = await userService.register(username, password, isAdmin);
      res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
      handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { user, token } = await userService.login(username, password);
      res.json({ user, token });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      if (!req.user!.isAdmin) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
      }
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, isAdmin } = req.body;

      // Apenas administradores ou o próprio usuário podem atualizar
      if (!req.user!.isAdmin && req.user!.id !== Number(id)) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
      }

      const updatedUser = await userService.updateUser(Number(id), username, isAdmin);
      res.json(updatedUser);
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.user!.isAdmin) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
      }

      await userService.deleteUser(Number(id));
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new UserController();
