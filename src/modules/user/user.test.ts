import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserController from "@/modules/user/user.controller";
import userService from "@/modules/user/user.service";

vi.mock("./user.service", () => ({
  default: {
    register: vi.fn(),
    login: vi.fn(),
    getAllUsers: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  },
}));

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  req.user = { id: 1, isAdmin: true };
  next();
});

app.post("/api/user/register", (req: Request, res: Response) =>
  UserController.register(req, res)
);
app.post("/api/user/login", (req: Request, res: Response) =>
  UserController.login(req, res)
);
app.get("/api/user", (req: Request, res: Response) =>
  UserController.getAllUsers(req, res)
);
app.put("/api/user/:id", (req: Request, res: Response) =>
  UserController.updateUser(req, res)
);
app.delete("/api/user/:id", (req: Request, res: Response) =>
  UserController.deleteUser(req, res)
);



describe("User", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user and return status 201", async () => {
      const mockUser = { id: 1, username: "john_doe", isAdmin: false };
      (userService.register as any).mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/user/register")
        .send({
          username: "john_doe",
          password: "password123",
          isAdmin: false,
        });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(mockUser);
      expect(userService.register).toHaveBeenCalledWith(
        "john_doe",
        "password123",
        false
      );
    });

    it("should handle error during registration", async () => {
      (userService.register as any).mockRejectedValue(
        new Error("Registration failed")
      );

      const response = await request(app)
        .post("/api/user/register")
        .send({
          username: "john_doe",
          password: "password123",
          isAdmin: false,
        });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({ error: "Registration failed" });
    });
  });

  describe("login", () => {
    it("should login a user and return a token", async () => {
      const mockResponse = {
        user: { id: 1, username: "john_doe", isAdmin: false },
        token: "fake-token",
      };
      (userService.login as any).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/api/user/login")
        .send({ username: "john_doe", password: "password123" });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockResponse);
      expect(userService.login).toHaveBeenCalledWith("john_doe", "password123");
    });

    it("should handle error during login", async () => {
      (userService.login as any).mockRejectedValue(new Error("Login failed"));

      const response = await request(app)
        .post("/api/user/login")
        .send({ username: "john_doe", password: "password123" });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({ error: "Login failed" });
    });
  });

  describe("getAllUsers", () => {
    it("should return all users if the requester is an admin", async () => {
      const mockUsers = [
        { id: 1, username: "john_doe", isAdmin: false },
        { id: 2, username: "jane_doe", isAdmin: true },
      ];
      (userService.getAllUsers as any).mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/user");

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockUsers);
      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    it("should update a user if the requester is an admin or the user themselves", async () => {
      const mockUser = { id: 1, username: "john_doe_updated", isAdmin: false };
      (userService.updateUser as any).mockResolvedValue(mockUser);

      const response = await request(app)
        .put("/api/user/1")
        .send({ username: "john_doe_updated", isAdmin: false });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockUser);
      expect(userService.updateUser).toHaveBeenCalledWith(
        1,
        "john_doe_updated",
        false
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user if the requester is an admin", async () => {
      (userService.deleteUser as any).mockResolvedValue(true);

      const response = await request(app).delete("/api/user/2");

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });
  });
});
