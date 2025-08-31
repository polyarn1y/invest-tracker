import { loginUserSchema } from '@/dtos/user/login-user.dto';
import { createUserSchema } from "@/dtos/user/create-user.dto";
import AuthService from "@/services/auth.service";
import { Request, Response } from "express";

export default class AuthController {
  private authService: AuthService;

  constructor(authService?: AuthService) {
    this.authService = authService || new AuthService();
  }
  
  public createUser = async (req: Request, res: Response) => {
    const data = await createUserSchema.parseAsync(req.body);
    const user = await this.authService.createUser(data);
    
    res.status(201).json({
      success: true,
      user
    })
  }

  public loginUser = async (req: Request, res: Response) => {
    const data = await loginUserSchema.parseAsync(req.body);
    const { user, accessToken, refreshToken } = await this.authService.loginUser(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({
      success: true,
      user,
      accessToken: accessToken
    })
  };

  public refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ success: false, message: "No refresh token provided" })
    
    const { accessToken, refreshToken } = await this.authService.refreshToken(token);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accessToken
    })
  }

  public logoutUser = async (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    })
  };

  public verifyUser = async (req: Request, res: Response) => {
    const token = req.query?.token! as string;
    await this.authService.verifyUser(token);
    return res.status(200).json({
      success: true,
    })
  }
} 