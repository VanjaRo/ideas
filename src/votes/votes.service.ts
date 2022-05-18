import { Injectable } from "@nestjs/common";
import { Vote } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateVoteDto } from "./dto/create-vote.dto";

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async getAllVotes() {
    return this.prisma.vote.findMany();
  }

  async createVote(createVoteDto: CreateVoteDto): Promise<boolean> {
    // before creating a vote, check if the user has already voted
    const vote = await this.findVoteByThemeIdAndUserId(createVoteDto);
    if (vote) {
      return false;
    }
    let res = await this.prisma.vote.create({
      data: createVoteDto,
    });

    return true;
  }

  async findVotesByUserId(userId: number) {
    return this.prisma.vote.findMany({
      where: { user: { id: userId } },
    });
  }

  async findVoteById(id: number) {
    return this.prisma.vote.findUnique({
      where: { id },
    });
  }

  async findVoteByThemeIdAndUserId(voteDto: CreateVoteDto) {
    let votes = await this.prisma.vote.findMany({
      where: { theme: { id: voteDto.themeId }, user: { id: voteDto.userId } },
    });
    return votes[0];
  }

  async removeVoteByThemeIdAndUserId(voteDto: CreateVoteDto): Promise<boolean> {
    let vote = await this.findVoteByThemeIdAndUserId(voteDto);
    if (vote) {
      await this.prisma.vote.delete({
        where: { id: vote.id },
      });
      return true;
    }
    return false;
  }
}
