import { ApiProperty } from "@nestjs/swagger";

export class UpdateThemeDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  votes?: number;
  @ApiProperty()
  voting?: boolean;
}
