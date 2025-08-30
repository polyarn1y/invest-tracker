import { prisma } from "@/lib/prisma";
import { SignUpInput, LoginInput } from "@/validators/auth.validator";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const createUser = async (data: SignUpInput): Promise<User> => {
  const { email, password } = data;

  const existingUser = await prisma.user.findUnique({where: { email }})
  if (existingUser) throw new Error("User with this email already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  
  return await prisma.user.create({
    data: {
      email,
      passwordHash
    }
  })
}

export const loginUser = async (data: LoginInput): Promise<User | null> => {
  const { email, password } = data;
  
  const user = await prisma.user.findUnique({ where: { email }})
  if (!user) throw new Error("Invalid Creditianls");

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("Invalid Creditianls");

  return user;

};
