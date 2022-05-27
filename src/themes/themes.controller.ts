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
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("themes")
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @ApiOperation({ summary: "Create new theme." })
  @Post()
  async create(@Req() req: Request, @Body() createThemeDto: CreateThemeDto) {
    return this.themesService.createTheme(createThemeDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Theme successfuly upvoted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiOperation({ summary: "Upvote theme." })
  @Post("upvote/:id")
  @UseGuards(JwtAuthGuard)
  upvoteTheme(@Req() req: Request, @Param("id") id: number) {
    return this.themesService.upvote(id, req.user["id"]);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Theme successfuly downvoted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiOperation({ summary: "Downvote theme." })
  @Post("downvote/:id")
  @UseGuards(JwtAuthGuard)
  downvoteTheme(@Req() req: Request, @Param("id") id: number) {
    return this.themesService.downvote(id, req.user["id"]);
  }

  @ApiOperation({ summary: "Voting page." })
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
