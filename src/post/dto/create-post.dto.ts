import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class CreatePostDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: JSON;

  @ApiProperty()
  title: string;

  @ApiProperty()
  uploadTime: Date;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  author: Prisma.UserCreateNestedOneWithoutPostsInput;
}
