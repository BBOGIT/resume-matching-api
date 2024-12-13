import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResumeDto } from './dto/match-resume.dto';

@Controller('match-resume')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async matchResume(@Body() matchResumeDto: MatchResumeDto) {
    return this.matchService.matchResume(matchResumeDto);
  }
}
