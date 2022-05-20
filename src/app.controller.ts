import { Get, Controller, Render, Req } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Request } from "express";
import { PostService } from "./post/post.service";

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({ summary: "Main page." })
  @Get()
  @Render("pages/index")
  async root(@Req() req: Request) {
    // TODO: make a separate function for this
    let recentPosts = await this.postService.getManyRecentPosts(0, 9);
    for (let i = 0; i < recentPosts.length; i++) {
      recentPosts[i]["text"] = await this.postService.postJsonToHtml(
        recentPosts[i]["text"] as object as JSON
      );
    }
    // return { firstName: req.body.user.first_name, lastName: req.user.last_name };
    return { user: req.cookies["user"], posts: recentPosts };
  }

  @ApiOperation({ summary: "Post editor." })
  @Get("editor")
  @Render("pages/postEditor")
  texts(@Req() req: Request) {
    return { user: req.cookies["user"] };
  }
}
