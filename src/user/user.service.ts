import { Injectable } from "@nestjs/common";
import { Post, Prisma, User } from "@prisma/client";
import { PostService } from "src/post/post.service";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly postService: PostService
  ) {}
  // add prisma to all the calls

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // check if user with this id exists
    // check if user with this username or id exists
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: createUserDto.id }, { username: createUserDto.username }],
      },
    });
    if (user) {
      return user;
    }
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getUserPosts(id: number, skip: number, take: number): Promise<Post[]> {
    // get user by username
    let user = await this.prisma.user.findUnique({
      where: { id },
    });
    // return empty array if user not found
    if (!user) {
      return [];
    }
    return this.postService.getPostsByUserId(user.id, skip, take);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
