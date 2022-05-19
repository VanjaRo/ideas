import { Controller, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  @ApiOperation({ summary: "Authenticate user using Telegram" })
  @Post("telegram")
  authenticateTelegram(@Req() req: Request) {
    return {
      status: "success",
      data: {
        ...req.body.user,
      },
    };
  }
}
