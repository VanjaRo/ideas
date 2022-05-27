import { Injectable } from "@nestjs/common";
import { Theme } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { VotesService } from "src/votes/votes.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";

@Injectable()
export class ThemesService {
  constructor(
    private prisma: PrismaService,
    private votesService: VotesService
  ) {}

  async createTheme(createThemeDto: CreateThemeDto) {
    createThemeDto.votes = 1;
    return this.prisma.theme.create({
      data: createThemeDto,
    });
  }

  async downvote(themeId: number, userId: number) {
    let theme = await this.findThemeById(themeId);
    if (!theme) {
      return {
        status: "error",
      };
    }
    let voteDto = {
      themeId: themeId,
      userId: userId,
    };
    let result = await this.votesService.removeVoteByThemeIdAndUserId(voteDto);
    if (result) {
      this.updateThemeById(themeId, { votes: theme.votes - 1 });
      return {
        status: "success",
      };
    }
    return {
      status: "error",
    };
  }

  async upvote(themeId: number, userId: number) {
    // console.log(themeId);
    let theme = await this.findThemeById(themeId);
    if (!theme) {
      return {
        status: "error",
      };
    }
    let voteDto = {
      themeId: themeId,
      userId: userId,
    };
    let result = await this.votesService.createVote(voteDto);
    if (result) {
      this.updateThemeById(themeId, { votes: theme.votes + 1 });
      return {
        status: "success",
      };
    }
    return {
      status: "error",
    };
  }

  async findThemeById(id: number): Promise<Theme | null> {
    return this.prisma.theme.findUnique({
      where: { id },
    });
  }

  async findActiveThemes() {
    return this.prisma.theme.findMany({
      where: { voting: true },
    });
  }

  async updateThemeById(
    id: number,
    updateThemeDto: UpdateThemeDto
  ): Promise<Theme | null> {
    return this.prisma.theme.update({
      where: { id },
      data: updateThemeDto,
    });
  }
}
