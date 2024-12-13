import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { MatchResumeDto } from './dto/match-resume.dto';

@Injectable()
export class MatchService {
  private openai: OpenAI;
  private readonly logger = new Logger(MatchService.name);

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  private generatePrompt(dto: MatchResumeDto): string {
    const textPrompt =
      dto.prompt ||
      `
     Analyze the following resume and job description for compatibility.
     Provide a detailed matching analysis including:
     1. Overall match percentage
     2. Key matching skills and qualifications
     3. Missing requirements 
     4. Recommendations for improvement`;

    const basePrompt = `${textPrompt}
    
    Resume:
     ${dto.resume}
     
     Job Description:
     ${dto.jobDescription}`;

    this.logger.debug('Generated prompt:', basePrompt);
    return basePrompt;
  }

  async matchResume(dto: MatchResumeDto) {
    try {
      const prompt = this.generatePrompt(dto);

      this.logger.log('Sending request to OpenAI');
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
        temperature: 0.7,
      });

      this.logger.debug('OpenAI response:', completion);

      return {
        feedback: completion.choices[0].message.content,
        matchPrompt: prompt,
      };
    } catch (error) {
      this.logger.error('OpenAI API error:', error);
      throw new Error(`Failed to match resume: ${error.message}`);
    }
  }
}
