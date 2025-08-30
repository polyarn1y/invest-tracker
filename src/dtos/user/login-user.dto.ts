import { z } from "zod";
import { SafeUserResponseDto } from "./user-response.dto";
import { TokensDto } from "../jwt/tokens.dto";

export const loginUserSchema = z.object({
  email: z.email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required')
})

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export type LoginUserResponseDto = {
  user: SafeUserResponseDto,
} & TokensDto