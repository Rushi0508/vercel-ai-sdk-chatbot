import { Body, Controller, Post, Res } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat.dto';
import { AiService } from './ai.service';
import { Response } from 'express';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-text')
  async generateText(@Body() body: ChatRequestDto, @Res() res: Response) {
    return this.aiService.generateText(body, res);
  }
}
