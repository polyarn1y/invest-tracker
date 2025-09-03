import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EMAIL_SECRET: z.string(),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
  JWT_EMAIL_EXPIRES: z.string().default("1h"),
  
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
});

const env = envSchema.parse(process.env);

export const config = {
  server: {
    nodeEnv: env.NODE_ENV,
  },
  
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    emailSecret: env.JWT_EMAIL_SECRET,
    accessExpires: env.JWT_ACCESS_EXPIRES,
    refreshExpires: env.JWT_REFRESH_EXPIRES,
    emailExpires: env.JWT_EMAIL_EXPIRES,
  },
  
  email: {
    smtpUser: env.SMTP_USER,
    smtpPassword: env.SMTP_PASSWORD,
  },
} as const;

export const { server, email } = config;
export const jwtConfig = config.jwt;