import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Render,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PostService } from "src/post/post.service";

@ApiTags("users")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @ApiOperation({ summary: "Get user page with :id" })
  @Get(":username")
  @Render("pages/userToFind")
  async getUser(@Req() req: Request, @Param("username") username: string) {
    let userToFind = await this.userService.getUserByUsername(username);
    if (!userToFind) {
      return { user: req.cookies["user"], error: "user not found" };
    }
    let sameUser = false;
    if (req.cookies["user"]) {
      sameUser = req.cookies["user"].username === userToFind["username"];
    }
    // Maybe posts could be rendered on a client side using js
    // find 6 user posts
    let userPosts = await this.userService.getUserPosts(userToFind["id"], 0, 9);
    // TODO: make a separate function for this
    for (let i = 0; i < userPosts.length; i++) {
      userPosts[i]["text"] = await this.postService.postJsonToHtml(
        userPosts[i]["text"] as object as JSON
      );
    }
    // console.log(userPosts);
    return {
      user: req.cookies["user"],
      userToFind: userToFind,
      sameUser: sameUser,
      userPosts: userPosts,
    };
  }

  // @ApiOperation({ summary: "Get user's posts :id" })
  // @Get(":id/posts")
  // findOnePosts(@Param("id") id: string) {
  //   return this.userService.findOne();
  // }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: "Modify user page with :id" })
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
}
