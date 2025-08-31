import { JwtPayloadDto } from '@/dtos/jwt/jwt-payload.dto';
import { smtpTransport } from '@/integrations/smtp';
import JwtService from '@/services/jwt.service';

export default class MailService {
  private jwtService: JwtService;
  
  constructor(jwtService?: JwtService) {
    this.jwtService = jwtService || new JwtService()
  }

  public async sendVerificationEmail(payload: JwtPayloadDto, email: string) {
    const token = this.jwtService.generateEmailToken(payload);
    const link = `http://localhost:3000/api/auth/verify?token=${token}`
    
    await smtpTransport.sendMail({
      from: `"InvestPlatform" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification",
      html: `
        <h1>Welcome!</h1>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${link}">${link}</a>
      `,
    });
  }
}