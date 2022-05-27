import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";
import { PostService } from "src/post/post.service";
import { PostModule } from "src/post/post.module";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, PostService],
  exports: [UserService],
})
export class UserModule {}
