import { SafeUserResponseDto } from "@/dtos/user/user-response.dto";
import { prisma } from "@/lib/prisma";
import { Prisma, PrismaClient, User } from "@prisma/client";
  
export default class UserRepository {
  private readonly database: PrismaClient;
  constructor() {
    this.database = prisma; 
  }

  async create(data: Prisma.UserCreateInput): Promise<SafeUserResponseDto> {
    return await this.database.user.create({ data, select: { id: true, email: true, role: true, isVerified: true, created_at: true, updated_at: true }})
  }

  async getById(id: string) {
    return await this.database.user.findUnique({ where: { id }})
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.database.user.findUnique({ where: { email }})
  }

  async markVerified(id: string) {
    return await this.database.user.update({
      where: {
        id
      },
      data: {
        isVerified: true,
      }
    })
  }
}