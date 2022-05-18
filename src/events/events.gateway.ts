import { Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ThemesService } from "src/themes/themes.service";

const port = process.env.PORT;

@WebSocketGateway({
  cors: {
    origin: [
      "https://ideas-texts.herokuapp.com",
      "http://localhost:" + port ? port : 3000,
    ],
  },
})
export class EventsGateway {
  constructor(private themesService: ThemesService) {}

  @WebSocketServer() server: Server;

  // message for subtracting vote
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("minus")
  async handleMinusMessage(
    @Req() req: Request,
    client: Socket,
    @MessageBody("id") elementId: string
  ): Promise<void> {
    //   check if status was a success
    this.themesService
      .downvote(+elementId, req.user["id"])
      .then((data) => {
        if (data.status === "success") {
          this.server.emit("minus", { id: elementId });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // message for adding vote
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("plus")
  async handlePlusMessage(
    @Req() req: Request,
    client: Socket,
    @MessageBody("id") elementId: string
  ): Promise<void> {
    this.themesService
      .upvote(+elementId, req.user["id"])
      .then((data) => {
        if (data.status === "success") {
          this.server.emit("plus", { id: elementId });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
