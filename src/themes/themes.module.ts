import { Module } from "@nestjs/common";
import { ThemesService } from "./themes.service";
import { ThemesController } from "./themes.controller";
import { PrismaService } from "src/prisma.service";
import { VotesModule } from "src/votes/votes.module";

@Module({
  imports: [VotesModule],
  controllers: [ThemesController],
  providers: [ThemesService, PrismaService],
  exports: [ThemesService],
})
export class ThemesModule {}
