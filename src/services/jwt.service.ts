import { JwtPayloadDto } from "@/dtos/jwt/jwt-payload.dto";
import jwt, { Jwt, JwtPayload, SignOptions } from "jsonwebtoken";

export default class JwtService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET!;
  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET!;
  private readonly emailSecret = process.env.JWT_EMAIL_SECRET!;
  private readonly accessExpires = process.env.JWT_ACCESS_EXPIRES;
  private readonly refreshExpires = process.env.JWT_REFRESH_EXPIRES;

  public generateTokens(payload: JwtPayloadDto) {
    const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpires } as SignOptions)
    const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpires } as SignOptions)
    return { accessToken, refreshToken };
  }

  public generateEmailToken(payload: JwtPayloadDto) {
    return jwt.sign(payload, this.emailSecret, { expiresIn: "1h" })
  }

  public verifyEmailToken(emailToken: string): JwtPayloadDto {
    return jwt.verify(emailToken, this.emailSecret) as JwtPayloadDto
  }  

  public verifyRefreshToken(refreshToken: string): JwtPayloadDto {
    return jwt.verify(refreshToken, this.refreshSecret) as JwtPayloadDto
  }

  public verifyAccessToken(accessToken: string): JwtPayloadDto {
    return jwt.verify(accessToken, this.accessSecret) as JwtPayloadDto
  }
}