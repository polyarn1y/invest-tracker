import JwtService from "@/services/jwt.service";
import UserService from "@/services/user.service";
import MailService from "@/services/mail.service";
import { CreateUserDto } from "@/dtos/user/create-user.dto";
import { SafeUserResponseDto } from "@/dtos/user/user-response.dto";
import { LoginUserDto, LoginUserResponseDto } from "@/dtos/user/login-user.dto";
import { TokensDto } from "@/dtos/jwt/tokens.dto";

export default class AuthService {
  private userService: UserService;
  private jwtService: JwtService;
  private mailService: MailService;
  
  constructor(userService?: UserService, jwtService?: JwtService, mailService?: MailService) {
    this.userService = userService || new UserService();
    this.jwtService = jwtService || new JwtService();
    this.mailService = mailService || new MailService();
  }

  public async createUser(data: CreateUserDto): Promise<SafeUserResponseDto> {
    const user = await this.userService.create(data);
    await this.mailService.sendVerificationEmail({ id: user.id!, role: user.role }, user.email)
    return user;
  }

  public async loginUser(data: LoginUserDto ): Promise<LoginUserResponseDto> {
    const user = await this.userService.login(data);
    const tokens = this.jwtService.generateTokens({ id: user.id!, role: user.role })
    return { user, ...tokens };
  }

  public async refreshToken(token: string): Promise<TokensDto> {
    const payload = this.jwtService.verifyRefreshToken(token);
    return this.jwtService.generateTokens({ id: payload.id, role: payload.role })
  }

  public async verifyUser(token: string) {
    const payload = this.jwtService.verifyEmailToken(token);
    await this.userService.markVerified(payload.id);
  }
}