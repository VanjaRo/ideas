import { ApiProperty } from "@nestjs/swagger";

export class CreateThemeDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  votes: number;
  @ApiProperty()
  voting: boolean;
}
