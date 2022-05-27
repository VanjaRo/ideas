import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Authenticate user using Telegram" })
  @ApiResponse({ status: 200, description: "User is authenticated" })
  @Post("telegram")
  async authenticateTelegram(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    let user = req.body.user;
    const token = await this.authService.login(user);
    // console.log(token);
    let secondaryInfo = {
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
      username: user.username,
    };
    // set res cookie with jwt and expiration in 2 weeks
    let expiry = {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
    };
    res.cookie("jwt", token, expiry);
    res.cookie("user", secondaryInfo, expiry);
    // console.log(req.body.user);
  }

  // logout by clearing cookies
  @ApiOperation({ summary: "Logout user" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "User has logged out" })
  @ApiResponse({ status: 401, description: "You need to be authenticated" })
  @UseGuards(JwtAuthGuard)
  @Get("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie("jwt");
    res.clearCookie("user");
    res.redirect("/");
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("test")
  // testAuth(@Req() req: Request) {
  //   console.log(req.cookies["user"]);
  //   return {
  //     status: "success",
  //   };
  // }
}
