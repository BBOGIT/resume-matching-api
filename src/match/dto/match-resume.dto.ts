import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class MatchResumeDto {
  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsOptional()
  prompt?: string;
}
