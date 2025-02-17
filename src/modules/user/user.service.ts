import { env } from "@/common/utils/envConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/client";

class UserService {
  async register(username: string, password: string, isAdmin = false) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        isAdmin,
      },
    });
  }

  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  async getAllUsers() {
    return prisma.user.findMany({
      select: { id: true, username: true, isAdmin: true }, // Não retornar a senha
    });
  }

  async updateUser(id: number, username: string, isAdmin: boolean) {
    return prisma.user.update({
      where: { id },
      data: { username, isAdmin },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
