import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Req,
  UseGuards,
  Render,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";
import { FileUploadDto } from "./dto/file-upload-dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Post successfuly created" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiOperation({ summary: "Create new post" })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    // check if title exists
    // check if text exists
    if (!createPostDto.title || !createPostDto.text) {
      return { error: "title and text are required" };
    }

    let userInfo = req.user as any;
    createPostDto.authorId = userInfo["id"];
    createPostDto.uploadTime = createPostDto.text["time"];
    createPostDto.id = await this.postService.createiId(
      createPostDto.title,
      createPostDto.text["time"]
    );
    // send a link to a created post
    this.postService.createPost(createPostDto);
    // console.log(post);
    return {
      link: `/post/${createPostDto.id}`,
    };
  }

  @ApiOperation({ summary: "Get post with certain id" })
  @Render("pages/postDetailed")
  @Get(":id")
  async findOne(@Req() req: Request, @Param("id") id: string) {
    let post = await this.postService.getPostById(id);
    if (!post) {
      return { user: req.cookies["user"], error: "post not found" };
    }
    return {
      user: req.cookies["user"],
      title: post.title,
      text: await this.postService.postJsonToHtml(post.text as object as JSON),
    };
  }

  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: "Post successfuly found" })
  // @ApiResponse({ status: 404, description: "Post not found" })
  // @ApiResponse({ status: 403, description: "Forbidden" })
  // @ApiOperation({ summary: "Modify post with certain id" })
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.updatePost(+id, updatePostDto);
  // }

  // @ApiBearerAuth()
  // @ApiResponse({
  //   status: 200,
  //   description: "Image uploaded successfuly",
  //   type: "string",
  // })
  // @ApiResponse({ status: 403, description: "Forbidden" })
  // @ApiOperation({ summary: "Upload an image for the post" })
  // @ApiBody({
  //   type: FileUploadDto,
  // })
  // @Post("upload-img")
  // uploadImg(@UploadedFile() file): string {
  //   return this.postService.findAll();
  // }
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: "Post successfuly deleted" })
  // @ApiResponse({ status: 404, description: "Post not found" })
  // @ApiResponse({ status: 403, description: "Forbidden" })
  // @ApiOperation({ summary: "Remove post with certain id" })
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.postService.remove(+id);
  // }
}
