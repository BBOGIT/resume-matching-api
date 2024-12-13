import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';

@Module({
  imports: [ConfigModule.forRoot(), MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
