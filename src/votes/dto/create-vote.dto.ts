import { ApiProperty } from "@nestjs/swagger";

export class CreateVoteDto {
  @ApiProperty()
  themeId: number;
  @ApiProperty()
  userId: number;
}
