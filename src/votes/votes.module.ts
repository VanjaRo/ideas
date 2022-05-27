import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "src/prisma.service";
import { VotesController } from "./votes.controller";
import { VotesService } from "./votes.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["heroku.env", ".env"],
    }),
  ],
  controllers: [VotesController],
  providers: [VotesService, PrismaService],
  exports: [VotesService],
})
export class VotesModule {}
