import bcrypt from 'bcrypt';
import UserRepository from "@/repository/user.repository";
import { CreateUserDto } from "@/dtos/user/create-user.dto";
import { LoginUserDto } from '@/dtos/user/login-user.dto';
import { SafeUserResponseDto } from "@/dtos/user/user-response.dto";
import ApiError from '@/utils/api-error';

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  public async create(data: CreateUserDto): Promise<SafeUserResponseDto> {
    const { email, password } = data;    

    const user = await this.userRepository.getByEmail(email);
    if (user) throw ApiError.conflict("User with this email already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    return this.userRepository.create({ email, passwordHash })
   }

   public async login(data: LoginUserDto): Promise<SafeUserResponseDto> {
    const { email, password } = data;

    const user = await this.userRepository.getByEmail(email);
    if (!user) throw ApiError.unauthorized("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash!);
    if (!isPasswordValid) throw ApiError.unauthorized("Invalid credentials");
    
    const { passwordHash, ...safeUser} = user;
    return safeUser;  
  }

  public async markVerified(id: string) {
    await this.userRepository.markVerified(id);
  }
}