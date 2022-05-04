import { Injectable } from "@nestjs/common";
import { Post, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPostById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post | null> {
    let { authorId } = createPostDto;

    createPostDto.author = { connect: { id: authorId } };

    let data = {
      id: createPostDto.id,
      text: createPostDto.text as object as Prisma.JsonObject,
      title: createPostDto.title,
      author: {
        connect: {
          id: authorId,
        },
      },
      // int to datetime
      uploadTime: new Date(createPostDto.uploadTime),
    };
    return this.prisma.post.create({
      data,
    });
    // console.log(postId);
    // return this.prisma.post.create({
    //   {
    //     ...createPostDto,
    //     author: { connect: { id: createPostDto.authorId } },
    //   },
    // });
  }

  async getPostsByUserId(
    authorId: number,
    take: number,
    skip: number
  ): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { author: { id: authorId } },
      orderBy: { uploadTime: "desc" },
      skip,
      take,
    });
  }

  async getManyRecentPosts(skip: number, take: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      orderBy: { uploadTime: "desc" },
      skip,
      take,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async postJsonToHtml(postJson: JSON): Promise<string> {
    const edjsHTML = require("editorjs-html");
    const edjsParser = edjsHTML();
    const html = edjsParser.parse(postJson);

    return html;
  }

  async createiId(title: string, time: number): Promise<string> {
    // creating id
    // delete all non-alphanumeric characters except for spaces
    // replace spaces with dashes
    let postId = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-");
    postId = postId + "-" + time;
    // make sure the id is unique
    let post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (post) {
      postId = postId + "-" + Math.floor(Math.random() * 100);
    }
    return postId;
  }
}
