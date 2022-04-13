import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
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
import { FileUploadDto } from "./dto/file-upload-dto";

@ApiTags("posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Post successfuly created" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiOperation({ summary: "Create new post" })
  @Post("")
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: "Get all posts" })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "Get post with certain id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Post successfuly found" })
  @ApiResponse({ status: 404, description: "Post not found" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiOperation({ summary: "Modify post with certain id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Image uploaded successfuly",
    type: "string",
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiOperation({ summary: "Upload an image for the post" })
  @ApiBody({
    description: "List of cats",
    type: FileUploadDto,
  })
  @Post("upload-img")
  uploadImg(@UploadedFile() file): string {
    return this.postService.findAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Post successfuly deleted" })
  @ApiResponse({ status: 404, description: "Post not found" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiOperation({ summary: "Remove post with certain id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
