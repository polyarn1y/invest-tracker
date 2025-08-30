import { LoginDto, SignUpDto } from "@/validators/auth.validator";
import { Request, Response } from "express";
import * as authService from "@/services/auth.service"

export const signup = async (req: Request, res: Response) => {
  const data = await SignUpDto.parseAsync(req.body);
  const user = await authService.createUser(data);
  const { passwordHash, ...rest } = user;

  res.status(201).json({
    success: true,
    user: rest
  })
};

export const signin = async (req: Request, res: Response) => {
  const data = await LoginDto.parseAsync(req.body);
  const user = await authService.loginUser(data);
  const { passwordHash, ...rest } = user!;
  
  res.status(200).json({
    success: true,
    user: rest
  })  
};


export const logout = async (req: Request, res: Response) => {

};