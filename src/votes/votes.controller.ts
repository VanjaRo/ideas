import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { VotesService } from "./votes.service";

@Controller("votes")
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @ApiOperation({ summary: "Get all the votes" })
  @Get()
  async getAll() {
    let votes = await this.votesService.getAllVotes();
    return votes;
  }
}
