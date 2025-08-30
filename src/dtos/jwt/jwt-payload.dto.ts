import { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadDto extends JwtPayload {
  id: string,
  role: string,
}