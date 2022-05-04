import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["heroku.env", ".env"],
    }),
    AuthModule,
  ],
  controllers: [PostController],
  exports: [PostService],
  providers: [PostService, PrismaService],
})
export class PostModule {}
