import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  photoUrl: string;
}
