import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Req,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { ThemesService } from "./themes.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { VotesService } from "src/votes/votes.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("themes")
export class ThemesController {
  constructor(
    private readonly themesService: ThemesService,
    private readonly votesService: VotesService
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() createThemeDto: CreateThemeDto) {
    return this.themesService.createTheme(createThemeDto);
  }

  @Post("upvote/:id")
  @UseGuards(JwtAuthGuard)
  upvoteTheme(@Req() req: Request, @Param("id") id: number) {
    // create vote dto
    let voteDto = {
      themeId: id,
      userId: req.user["id"],
    };
    let result = this.votesService.createVote(voteDto);
    if (result) {
      return {
        status: "success",
      };
    }
    return {
      status: "error",
    };
  }

  @Post("downvote/:id")
  @UseGuards(JwtAuthGuard)
  downvoteTheme(@Req() req: Request, @Param("id") id: number) {
    // create vote dto
    let voteDto = {
      themeId: id,
      userId: req.user["id"],
    };
    let result = this.votesService.removeVoteByThemeIdAndUserId(voteDto);
    if (result) {
      return {
        status: "success",
      };
    }
    return {
      status: "error",
    };
  }

  @Get("voting")
  @Render("pages/voting")
  async findActive(@Req() req: Request) {
    let themesActive = await this.themesService.findActiveThemes();
    return { user: req.cookies["user"], themes: themesActive };
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.themesService.remove(+id);
  // }
}
