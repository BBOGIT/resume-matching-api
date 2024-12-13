import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [ConfigModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
