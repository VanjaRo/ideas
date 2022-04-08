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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileUploadDto } from "./dto/file-upload-dto";

@ApiTags("posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "Create new post" })
  @Post("create")
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

  @ApiOperation({ summary: "Modify post with certain id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: "Upload an image for the post" })
  @ApiBody({
    description: "List of cats",
    type: FileUploadDto,
  })
  @Post("upload-img")
  uploadImg(@UploadedFile() file) {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "Remove post with certain id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
